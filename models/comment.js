const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
  },

  content: { type: String, required: true },

  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  username: {
    type: String,
    required: true,
  },
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
