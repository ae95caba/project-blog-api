const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },

  admin: { type: Boolean, required: true },
});

// Virtual for book's URL
BikeSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/bike/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
