const Mongoose = require('mongoose')

const postSchema = new Mongoose.Schema({
  any:{}
},{strict:false})

const PostModel = Mongoose.model("Post", postSchema)

module.exports = PostModel