const router = require('express').Router();

const userRoute = require('./user.routes');
const chat_messageRoute = require('./chat_message.routes')


router.use('/users', userRoute);
router.use('/chat_messages', chat_messageRoute);

module.exports = router;