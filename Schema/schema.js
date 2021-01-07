import {gql} from 'apollo-server'

export const typeDefs=gql`
type Query {
    getUsers:[User!]!
    getPosts:[Post!]!
}

type Mutation {
    createUser(email:String!,name:String!,Age:Int!,password:String!):User!
    signin(email:String!,pass:String!):String!
    createPost(title:String!,body:String!,Image:String!):Post!
    likePost(id:String!):Post!
    dislikePost(id:String!):Post!
}

type User {
    _id:ID!
    email:String!
    Name:String!
    Age:Int!
    Password:String!
    posts:[Post!]!
    comments:[Comment!]
}

type Post {
    _id:ID!
    Title:String!
    Body:String!
    Image:String!
    Likes:[User!]!
    user:User!
    comments:[Comment!]

}

type Comment {
    id:ID!
    Text:String!
    user:User!
    post:Post!
}

`