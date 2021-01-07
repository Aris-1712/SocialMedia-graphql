import { UserInputError } from "apollo-server";

import UserDB from '../DbModels/UserDB'
import PostModel from '../DbModels/PostDB'
export const Comment={
    async user(parent,args,ctx,info){
        let data=await UserDB.findOne({_id:parent.USERID})
        data=data.toJSON()
        return {Name:data.name,Age:data.Age,email:data.email,_id:data._id}
    },
    async post(parent,args,ctx,info){
        let data=await UserDB.findOne({_id:parent.POSTID})
        data=data.toJSON()
        return {Title:data.title,
            Image:data.image,
            Body:data.body,
            Likes:data.Likes,
            _id:data._id
            }
    }
}