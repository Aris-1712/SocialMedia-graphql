import jwt from 'jsonwebtoken'

export const signing=(data)=>{
    const sign=jwt.sign({data:data},process.env.JWT,{ expiresIn: '1D'})
    return sign
} 

export const verify=(token)=>{
    const result=jwt.verify(token,process.env.JWT)
    return result
}
