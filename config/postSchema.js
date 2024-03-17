const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: { type: String, required: true },
  post: { type: String, required: true },
});

const postModel = mongoose.model("post", userSchema);

module.exports = { postModel };
