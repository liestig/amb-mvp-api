const {roles} = require('../../config');

module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        },
        password: {
            type: 'string'
        },
        age: {
            type: 'number'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        role: {
            type: 'string',
            enum: Object.values(roles)
        },
        city: {
            type: 'string'
        },
        isChief: {
            type: 'boolean'
        },
        description: {
            type: 'string'
        },
        address: {
            type: 'string'
        }
    },
    required: [
        'email',
        'password',
        'age',
        'firstName',
        'lastName',
        'city',
        'isChief',
        'address'
    ],
    additionalProperties: false
};