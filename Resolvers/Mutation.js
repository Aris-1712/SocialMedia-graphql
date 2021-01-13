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
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id,image:res.image}
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
    async getUser(parent,args,ctx,info){
        if(ctx.data){
        let res=await UserDB.findOne({email:args.email})
        res=res.toJSON()
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id,image:res.image}
    }
    
    }
    ,
    async createPost(parent,args,ctx,info){
        // console.log("HERE")
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
                POSTID:args.pid,
                time:args.time
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
            // console.log(post)
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
    async follow(parent,args,ctx,info){
        if(ctx.data){
            // console.log(args)
            let data=await UserDB.findOne({_id:args.id})
            
            let user=data.toJSON()
            user.followers=[...user.followers,ctx.data._id]
            await UserDB.findByIdAndUpdate({_id:args.id},{followers:user.followers})
            // 
            let dataCurrent=await UserDB.findOne({_id:ctx.data._id})
            let currentUser=dataCurrent.toJSON()
            currentUser.following=[...currentUser.following,args.id]
            await UserDB.findByIdAndUpdate({_id:ctx.data._id},{following:currentUser.following})
            return "Success"
        }   
    },
    async unfollow(parent,args,ctx,info){
        if(ctx.data){
            // console.log(args)
            let data=await UserDB.findOne({_id:args.id})
            let delind=null
            let user=data.toJSON()
            user.followers.forEach((element,index) => {
                if(element===ctx.data._id){
                    delind=index
                }
            });
            user.followers.splice(delind,1)
            // user.followers=[...user.followers,ctx.data._id]
            await UserDB.findByIdAndUpdate({_id:args.id},{followers:user.followers})
            // 
            let dataCurrent=await UserDB.findOne({_id:ctx.data._id})
            let currentUser=dataCurrent.toJSON()
            // currentUser.following=[...currentUser.following,args.id]
            let delindUser=null
            currentUser.following.forEach((ele,ind)=>{
                if(ele===args.id){
                    delindUser=ind
                }
            })
            currentUser.following.splice(delindUser,1)
            await UserDB.findByIdAndUpdate({_id:ctx.data._id},{following:currentUser.following})
            return "Success"
        }   
    },
    async getPost(parent,args,ctx,info){
        if(ctx.data){
            let data=await PostModel.findOne({_id:args.id})
            let post=data.toJSON()
            return {Title:post.title,_id:post._id,Body:post.body,Image:post.image,Likes:post.Likes,USERID:post.user}
        }
    }
  
    
}