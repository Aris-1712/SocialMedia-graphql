import UserDB from '../DbModels/UserDB'
import CommentDB from '../DbModels/CommentDB'
export const Post={
   async user(parent,args,ctx,info){
        let data=await UserDB.findOne({_id:parent.USERID})
        let res=data.toJSON()
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id,image:res.image}
    },
   async Likes(parent,args,ctx,info){
    let res = await UserDB.find()
    let temp=[]
    parent.Likes.forEach(element => {
        
        res.forEach(ele => {
            let user=ele.toJSON()
            if(user._id==element){
               let data= {Name:user.name,Age:user.Age,email:user.email,_id:user._id,image:res.image}
               temp.push(data)
            }
        })
    });
    return temp
   },
   async comments(parent,args,ctx,info){
    let res=await CommentDB.find({POSTID:(parent._id).toString()})
    console.log(res)
    let temp=[]
    res.forEach((ele)=>{
        ele=ele.toJSON()
        temp.push(ele)
    })
    return temp
   } 

}