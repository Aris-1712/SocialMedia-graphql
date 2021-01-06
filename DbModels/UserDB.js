const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
  any:{}
},{strict:false})

const UserModel = Mongoose.model("User", userSchema)

module.exports = UserModel