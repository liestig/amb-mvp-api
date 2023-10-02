const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'dpg-ckdc1jesmu8c73fv94k0-a',
    port: 5432,
    database: 'ambrosia_app',
    username: 'admin',
    password: 'gfBP8rSgJcEKhFdIjiSbwOTKRETgas9Y',
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