const { Schema, model } = require('mongoose');

const chatMessageSchema = new Schema({
  text:{
    type:String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
},
 updatedAt: {
    type: Date,
    default: Date.now, 
},
img: {
  type: String,
}
})

chatMessageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ChatMessage = model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;