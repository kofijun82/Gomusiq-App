const ForumThreadSchema = new Schema({
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'ForumCategory', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('ForumThread', ForumThreadSchema);