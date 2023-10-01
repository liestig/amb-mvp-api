const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',         // Adresse du serveur PostgreSQL
    port: 5432,                // Port sur lequel PostgreSQL écoute
    database: 'ambmvpapi', // Nom de la base de données à laquelle vous souhaitez vous connecter
    username: 'me', // Nom d'utilisateur PostgreSQL
    password: 'password', // Mot de passe PostgreSQL
    logging: console.log,
});

module.exports = {
    sequelize,
    port: 8000,
    jwtSecret: '1HN4MWA76T5Q6qtebqQR15x2DPNdW-CO_6YB174KHGEh6yCyXQhHnz1MXSeSHUzr_fK84fNoOqwHsatKFZJw9wwgyS5geYU6oxfprBZfVEJImkJj1LDX_V-IEhKR971nzG5TRcbHhsfvQYAvWiWpz1ToZLrMAgoHqki1T4zCVq8',
    jwtExpirationInSeconds: 60 * 60, // 1 hour
    roles: {
        USER: 'user',
        ADMIN: 'admin'
    }
}