
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForumCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("ForumCategory", ForumCategorySchema);