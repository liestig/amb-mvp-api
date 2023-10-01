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
        phoneNumber: {
            type: 'string',
            pattern: '^0[1-9][0-9]{8}$',
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
        'phoneNumber',
        'firstName',
        'lastName',
        'city',
        'isChief',
        'address'
    ],
    additionalProperties: false
};