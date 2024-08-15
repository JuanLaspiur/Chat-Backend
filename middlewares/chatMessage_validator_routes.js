const { check } = require("express-validator");

const chatMessageValidations = {
    createChatMessage:[
        check('userId', 'El campo userId es obligatorio').isMongoId(),
    ],
};

module.exports = chatMessageValidations;