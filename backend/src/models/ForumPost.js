
const ForumPostSchema = new Schema({
    content: { type: String, required: true },
    thread: { type: Schema.Types.ObjectId, ref: 'ForumThread', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('ForumPost', ForumPostSchema);
  