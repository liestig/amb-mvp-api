const UserModel = require("./../../common/models/User");
const {generateAccessToken} = require("../../authorization/controllers/AuthorizationController");

module.exports = {
    getUser: (req, res) => {
        const {
            user: {userId},
        } = req;

        console.log(userId)

        UserModel.findUser({id: userId})
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            });
    },

    updateUser: (req, res) => {
        const {
            user: {userId},
            body: payload,
        } = req;

        console.log(userId);
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not update the user.",
                },
            });
        }

        UserModel.updateUser({id: userId}, payload)
            .then(() => {
                return UserModel.findUser({id: userId});
            })
            .then((user) => {
                const accessToken = generateAccessToken(user.email, user.id, user.city, user.isChief);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            })
            .catch((err) => {
                console.log(userId)
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            });
    },

    deleteUser: (req, res) => {
        const {
            params: {userId},
        } = req;

        UserModel.deleteUser({id: userId})
            .then((numberOfEntriesDeleted) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfUsersDeleted: numberOfEntriesDeleted
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            });
    },

    getAllUsers: (req, res) => {
        UserModel.findAllUsers(req.query)
            .then((users) => {
                return res.status(200).json({
                    status: true,
                    data: users,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            });
    },

    changeRole: (req, res) => {
        const {
            params: {userId},
            body: {role},
        } = req;

        UserModel.updateUser({id: userId}, {role})
            .then(() => {
                return UserModel.findUser({id: userId});
            })
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            });
    },

    getChiefsAroundMe: async (req, res) => {
        try {
            const {user} = req;
            const city = user.city;

            console.log(city);
            console.log(typeof city);

            const chiefs = await UserModel.findAllUsers({
                city: city,
                isChief: true,
            });

            return res.status(200).json({
                status: true,
                data: chiefs,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: err.message,
            });
        }
    },

};