const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");


const {port} = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const {sequelize} = require("./config")

// Initialising the Model on sequelize
UserModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that already exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
    .sync()
    .then(() => {
        console.log("Sequelize Initialised!!");

        // Attaching the Authentication and User Routes to the app.
        app.use("/", AuthorizationRoutes);
        app.use("/user", UserRoutes);

        app.listen(PORT, () => {
            console.log("Server Listening on PORT:", port);
        });
    })
    .catch((err) => {
        console.error("Sequelize Initialisation threw an error:", err);
    });