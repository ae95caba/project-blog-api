const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  tittle: { type: String, required: true },
  timestamp: {
    type: Date,
    required: true,
  },

  content: { type: String, required: true },
  published: { type: Boolean, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
