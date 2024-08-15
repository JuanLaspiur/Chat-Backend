const ChatMessage = require('../models/ChatMessage');

const createChatMessage = async (text, userId) => {
    const chatMessage = new ChatMessage({ text, userId });
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
