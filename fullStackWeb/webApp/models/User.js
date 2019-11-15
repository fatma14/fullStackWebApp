const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    birthday: Date,
    email: String
})

const User = mongoose.model("User", userSchema);

module.exports = User;