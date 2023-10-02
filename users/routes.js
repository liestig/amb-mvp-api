const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/isAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/checkPermissionMiddleware");

// Controller Imports
const UserController = require("./controllers/UserController");


const {roles} = require("../config");

router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);

router.patch(
    "/",
    [
        isAuthenticatedMiddleware.check,
    ],
    UserController.updateUser
);

router.get(
    "/all",
    [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    UserController.getAllUsers
);

router.get(
    "/chiefs",
    [isAuthenticatedMiddleware.check],
    UserController.getChiefsAroundMe
);

router.patch(
    "/change-role/:userId",
    [
        isAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
    ],
    UserController.changeRole
);

router.delete(
    "/:userId",
    [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    UserController.deleteUser
);

module.exports = router;