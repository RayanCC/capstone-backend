const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

// static signup method

userSchema.statics.signup = async function (username, password, email) {
  // validation
  if (!username || !password || !email) {
    throw Error("All fields need to be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Convert username into lowercase

  const lowercaseUsername = username.toLowerCase();
  
  const exists = await this.findOne({ username: lowercaseUsername });

  if (exists) {
    throw Error("UserName already in use");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash, email });

  return user;
};

// static login method

userSchema.statics.login = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields need to be filled");
  }
  
  // convert username into lowercase
  const lowercaseUsername = username.toLowerCase();

  const user = await this.findOne({ username: lowercaseUsername });

  if (!user) {
    throw Error("Incorrect userName");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
