import UserDB from '../DbModels/UserDB'
export const Post={
   async user(parent,args,ctx,info){
        let data=await UserDB.findOne({_id:ctx.data._id})
        let res=data.toJSON()
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id}
    },
   async Likes(parent,args,ctx,info){
    let res = await UserDB.find()
    let temp=[]
    parent.Likes.forEach(element => {
        
        res.forEach(ele => {
            let user=ele.toJSON()
            if(user._id==element){
               let data= {Name:user.name,Age:user.Age,email:user.email,_id:user._id}
               temp.push(data)
            }
        })
    });
    return temp
   } 

}