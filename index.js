
import {ApolloServer,gql} from 'apollo-server'
import mongoose from 'mongoose'
import {Mutation} from './Resolvers/Mutation'
import {Query} from './Resolvers/Query'
import {typeDefs} from './Schema/schema'
import {verify} from './Authorization'
import {Post} from './Resolvers/Post'
import {Comment} from './Resolvers/comment'
mongoose.connect('mongodb+srv://aris:Arisgani1712@cluster0.ik8yo.mongodb.net/SocialMedia?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
 console.log("connected to db")

 const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:{Mutation,Query,Post,Comment},
    context:({req})=>{
    if(req.headers['x-auth-token']){
    let payLoad=verify(req.headers['x-auth-token'])
    return payLoad
}
    }
})

server.listen({ port: 4000 }).then(() => {
    console.log("conneted")
})

}).catch((err)=>{
    console.log(err)
})
