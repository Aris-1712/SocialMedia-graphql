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
            return data
        }
        else{
            throw new Error("Please provide Token")
        }
    }

}