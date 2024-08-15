const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
const {
    createChatMessage,
    updateChatMessage,
    getChatMessageById,
    deleteChatMessage,
    getAllChatMessages
} = require('../controllers/chat_message.controller');

const chatMessageValidations = require('../middlewares/chatMessage_validator_routes');
const router = Router();

router.post('/',chatMessageValidations.createChatMessage,handleValidationErrors, createChatMessage);       
router.get('/', getAllChatMessages);
router.get('/:id', getChatMessageById); 
router.put('/:id', updateChatMessage);    
router.delete('/:id', deleteChatMessage); 

module.exports = router;
