const router = require('express').Router();

const userRoute = require('./user.routes');
const chatRoute = require('./chat.routes');
const chat_messageRoute = require('./chat_message.routes')


router.use('/users', userRoute);
router.use('/chats', chatRoute);
router.use('/chat_messages', chat_messageRoute);

module.exports = router;