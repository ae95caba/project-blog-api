const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  timestamp: {
    type: Date,
    required: true,
  },

  content: { type: String, required: true },
  published: { type: Boolean, required: true },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
