import UserDB from '../DbModels/UserDB'
import Bcrypt from 'bcrypt'
import {signing} from '../Authorization'
import PostModel from '../DbModels/PostDB'
import CommentModel from '../DbModels/CommentDB'
import { Post } from './Post'
export const Mutation={
    async createUser(parent,args,ctx,info){
        
        let hashedpass=Bcrypt.hashSync(args.password,10)
        let find=await UserDB.find({email:args.email})
        if(find.length>0){
            throw new Error("Email already exists.")
        }
        let user=new UserDB({...args,password:hashedpass})
        let res=await user.save()
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id}
    },
    async signin(parent,args,ctx,info){
        let valid=await UserDB.findOne({email:args.email})
        if(valid){
            let user=valid.toJSON()
            let res=await Bcrypt.compare(args.pass,user.password)
            if(!res){
                throw new Error("Incorrect Password")
            }
            let token=signing({_id:user._id,email:user.email})
            return token
        }else{
            throw new Error("Incorrect Password or Email")
        }
    },
    async createPost(parent,args,ctx,info){
        console.log("HERE")
        if(ctx.data){
            let post=new PostModel({title:args.title,body:args.body,image:args.Image,Likes:[],user:ctx.data._id,comments:[]}) 
            let res=await post.save()
            return {Title:res.title,_id:res._id,Body:res.body,Image:res.image,Likes:res.Likes,USERID:res.user}
        }
        else{
            throw new Error("Please provide Token")
        }
    },
    async createComment(parent,args,ctx,info){
        if(ctx.data){
            let data={
                Text:args.text,
                USERID:ctx.data._id,
                POSTID:args.pid
            }
            let comment=new CommentModel(data)
            await comment.save() 
            return data
        }
        else{
            throw new Error("Please provide Token")
        }
    }
    ,
    async likePost(parent,args,ctx,info){
        if(ctx.data){
            let post=await PostModel.findOne({_id:args.id})
            post=post.toJSON()
            console.log(post)
            if(!post.Likes.includes(ctx.data._id)){
                await PostModel.findByIdAndUpdate({_id:args.id},{Likes:[...post.Likes,ctx.data._id]})
                return {Title:post.title,_id:post._id,Body:post.body,Image:post.image,Likes:[...post.Likes,ctx.data._id],USERID:post.user}
            }
            else{
                return {Title:post.title,_id:post._id,Body:post.body,Image:post.image,Likes:[...post.Likes],USERID:post.user}
            }
        }
        else{
            throw new Error("Please provide Token")
        }
    },
    async dislikePost(parent,args,ctx,info){
        if(ctx.data){
            let post=await PostModel.findOne({_id:args.id})
            post=post.toJSON()
            let ind=post.Likes.indexOf(ctx.data._id)
            let temp=[...post.Likes]
            temp.splice(ind,1)
            if(post){
                await PostModel.findByIdAndUpdate({_id:args.id},{Likes:temp})
                return {Title:post.title,_id:post._id,Body:post.body,Image:post.image,Likes:temp,USERID:post.user}
            }
        }
        else{
            throw new Error("Please provide Token")
        }
    },
  
    
}