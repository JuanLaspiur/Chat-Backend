const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User')
const { saveImage } = require('../helpers/saveImageFunction');

const createChatMessage = async (text, userId, img) => {
    const user = await User.findById(userId).select('name lastname img');
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const chatMessage = new ChatMessage({
      text,
      user: {
        name: user.name,
        lastname: user.lastname,
        _id: user._id,
        img: user.img,
      },
    });
  
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