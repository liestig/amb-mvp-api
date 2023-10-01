const {DataTypes} = require("sequelize");
const {roles} = require("../../config");

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Veuillez fournir une adresse e-mail valide.",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isValidPhoneNumber(value) {
                if (!/^0[1-9][0-9]{8}$/i.test(value)) {
                    throw new Error("Veuillez fournir un numéro de téléphone valide en France.");
                }
            },
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: roles.USER
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isChief: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        validate: {
            isAtLeast500Chars(value) {
                if (value.length < 500) {
                    throw new Error("La description doit contenir au moins 500 caractères.");
                }
            },
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("user", UserModel);
    },

    createUser: (user) => {
        return this.model.create(user);
    },

    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateUser: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllUsers: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    deleteUser: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};