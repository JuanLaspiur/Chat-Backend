const { response } = require("express");
const chatMessageService = require('../services/chat_messageService');

const createChatMessage = async (req, res = response) => {
    const { text, userId, img } = req.body;

    try {
        const chatMessage = await chatMessageService.createChatMessage(text, userId, img);
        return res.status(201).json({ success: true, data: chatMessage });
    } catch (error) {
        console.error('Error creando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error creando el mensaje del chat' });
    }
};

const updateChatMessage = async (req, res = response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedChatMessage = await chatMessageService.updateChatMessage(id, updateData);
        if (!updatedChatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: updatedChatMessage });
    } catch (error) {
        console.error('Error actualizando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error actualizando el mensaje del chat' });
    }
};

const getChatMessageById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const chatMessage = await chatMessageService.getChatMessageById(id);
        if (!chatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: chatMessage });
    } catch (error) {
        console.error('Error obteniendo el mensaje del chat por ID:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo el mensaje del chat por ID' });
    }
};

const deleteChatMessage = async (req, res = response) => {
    const { id } = req.params;

    try {
        const deletedChatMessage = await chatMessageService.deleteChatMessage(id);
        if (!deletedChatMessage) return res.status(404).json({ success: false, message: 'Mensaje no encontrado' });
        return res.status(200).json({ success: true, data: deletedChatMessage });
    } catch (error) {
        console.error('Error eliminando el mensaje del chat:', error);
        return res.status(500).json({ success: false, message: 'Error eliminando el mensaje del chat' });
    }
};

const getAllChatMessages = async (req, res = response) => {
    try {
        const chatMessages = await chatMessageService.getAllChatMessages();
        return res.status(200).json({ success: true, data: chatMessages });
    } catch (error) {
        console.error('Error obteniendo todos los mensajes del chat:', error);
        return res.status(500).json({ success: false, message: 'Error obteniendo todos los mensajes del chat' });
    }
};

module.exports = {
    createChatMessage,
    updateChatMessage,
    getChatMessageById,
    deleteChatMessage,
    getAllChatMessages 
};
