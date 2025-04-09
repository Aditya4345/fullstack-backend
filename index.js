const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./models/User')


const server = express()
server.use(cors())
server.use(bodyParser.json())


mongoose.connect('mongodb+srv://aditya:aditya%40123@leadsoft.i8dhe1b.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').then(()=>{
    console.log('Database connected');
}).catch((err)=>console.log(err))

 
server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userObj=new user({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,
            message:"user registered successfully !!"
        })
        const userExist=await user.findOne({userName})
    if(userExist){
        return res.json({
            status:false,
            message:"user already exists !"
        })
    }
    
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})
 
server.post('./login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await user.findOne({userName})
        if(!userName){
            return res.json({
                status:false,
            })
        }
        if(password !== userExist.password){
            return({
                status:false,
                message:"incorrect password !"
            })
        }
        res.json({
            status:true,
            message:"login successful !!"
        })
     }
     catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

server.listen(8085,()=>{
    console.log('Server is listening on port 8085')
})