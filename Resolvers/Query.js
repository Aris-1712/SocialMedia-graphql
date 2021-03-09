import UserDB from '../DbModels/UserDB'
import PostModel from '../DbModels/PostDB'
export const Query={
    async getUsers(parent,args,ctx,info){
    let res = await UserDB.find()
    let result=[]
    res.forEach(element => {
        let ele=element.toJSON()
        result.push({Name:ele.name,Age:ele.Age,email:ele.email,_id:ele._id,image:ele.image})
    });
    return result
    },
    async getPosts(parent,args,ctx,info){
        if(ctx.data){
            console.log(ctx.data.email)
            let user=await UserDB.findOne({_id:ctx.data._id})
            user=user.toJSON()
            console.log(user._id)
            let res=await PostModel.find()
            let data=[]
            
            res.forEach(element => {
                element=element.toJSON()
                console.log(user.following)
                if((user.following).includes(element.user)){
                    let post={Title:element.title,
                        Image:element.image,
                        Body:element.body,
                        Likes:element.Likes,
                        _id:element._id,USERID:element.user
                        }
                        data.push(post)
                }
                
            });
            console.log(data)
            return data
        }
        else{
            throw new Error("Please provide Token")
        }
    }

}