import {gql} from 'apollo-server'

export const typeDefs=gql`
type Query {
    getUsers:[User!]!
    getPosts:[Post!]!
}

type Mutation {
    createUser(email:String!,name:String!,Age:Int!,password:String!,image:String):User!
    signin(email:String!,pass:String!):String!
    createPost(title:String!,body:String!,Image:String!,time:String!):Post!
    likePost(id:String!):Post!
    dislikePost(id:String!):Post!
    createComment(text:String!,pid:String!,time:String!):Comment!
    follow(id:String!):String!
    unfollow(id:String!):String!
    getPost(id:String!):Post!
}

type User {
    _id:ID!
    email:String!
    Name:String!
    Age:Int!
    Password:String!
    posts:[Post!]!
    comments:[Comment!]
    likes:[Post!]
    followers:[User!]
    following:[User!]
    image:String!
}

type Post {
    _id:ID!
    Title:String!
    Body:String!
    Image:String!
    Likes:[User!]!
    user:User!
    comments:[Comment!]
    time:String
}

type Comment {
    id:ID!
    Text:String!
    time:String
    user:User!
    post:Post!
}

`