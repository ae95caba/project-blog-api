const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
  },

  content: { type: String, required: true },
  published: { type: Boolean, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for book's URL
BikeSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/bike/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
