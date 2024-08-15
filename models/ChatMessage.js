const { Schema, model } = require('mongoose');

const chatMessageSchema = new Schema({
  text:{
    type:String,
  },
  user: {
    type: {
      name: String,
      lastname: String,
      _id: Schema.Types.ObjectId,
      img: String,
    },
    required: true,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now 
},
 updatedAt: {
    type: Date,
    default: Date.now, 
}
})

chatMessageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ChatMessage = model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;