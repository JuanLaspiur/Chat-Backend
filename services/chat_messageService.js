const ChatMessage = require('../models/ChatMessage');
const { saveImage } = require('../helpers/saveImageFunction');

const createChatMessage = async (text, userId, img) => {
    const chatMessage = new ChatMessage({ text, userId });
    if (img) {
        await saveImage(img, chatMessage._id, "message-img");
        chatMessage.img = `${chatMessage._id}.webp`;
      }
    return await chatMessage.save();
};

const updateChatMessage = async (id, updateData) => {
    return await ChatMessage.findByIdAndUpdate(id, updateData, { new: true });
};

const getChatMessageById = async (id) => {
    return await ChatMessage.findById(id);
};

const deleteChatMessage = async (id) => {
    return await ChatMessage.findByIdAndDelete(id);
};

const getAllChatMessages = async () => {
    return await ChatMessage.find({});
};

module.exports = {
    createChatMessage,
    updateChatMessage,
    getChatMessageById,
    deleteChatMessage,
    getAllChatMessages 
};

/* Cambiar create message que pueda agregar imagen. */