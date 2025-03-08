const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;