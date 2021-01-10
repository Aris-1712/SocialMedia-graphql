import UserDB from '../DbModels/UserDB'
import PostModel from '../DbModels/PostDB'
import CommentModel from '../DbModels/CommentDB'
export const User={
   async posts(parent,args,ctx,info){
       if(ctx.data){
        let res=await PostModel.find()
        let data=[]
        res.forEach(element => {
            element=element.toJSON()
            let post={Title:element.title,
            Image:element.image,
            Body:element.body,
            Likes:element.Likes,
            _id:element._id,USERID:element.user
            }
            data.push(post)
        });
         let filtered=data.filter((ele)=>{
           return(ele.USERID==parent._id)  
         })
         return filtered
       }
   },
   async comments(parent,args,ctx,info){
       if(ctx.data){
        let res=await CommentModel.find()
        let data=[]
        res.forEach(ele=>{
            ele=ele.toJSON()
            data.push(ele)
        })
        let filtered=data.filter((ele)=>{
            return(parent._id==ele.USERID)
        })
        return filtered
       }
   },
   async likes(parent,args,ctx,info){
       
       if(ctx.data){
           let res=await PostModel.find()
           let data=[]
           
           res.forEach((ele)=>{
               ele=ele.toJSON()
               let post={Title:ele.title,_id:ele._id,Body:ele.body,Image:ele.image,Likes:ele.Likes,USERID:ele.user}
               data.push(post)

           })
           let filtered=data.filter((ele)=>{
            return(ele.Likes.includes((parent._id).toString()))
           })
           return filtered
       }
   }
}