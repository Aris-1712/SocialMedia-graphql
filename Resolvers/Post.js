import UserDB from '../DbModels/UserDB'
export const Post={
   async user(parent,args,ctx,info){
        let data=await UserDB.findOne({_id:ctx.data._id})
        let res=data.toJSON()
        return {Name:res.name,Age:res.Age,email:res.email,_id:res._id}
    }
}