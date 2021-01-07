const Mongoose = require('mongoose')

const commentSchema = new Mongoose.Schema({
  any:{}
},{strict:false})

const CommentModel = Mongoose.model("Comment", commentSchema)

module.exports = CommentModel