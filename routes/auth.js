const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("USER")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')  // to create token , so that secret key ban jaegi and private data pe access kar payenge login karne ke baad
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

// router.get
// router.post
// . . . 

router.get('/',(req,res)=>{
    res.send("Hello")
})

// get in only when user have token, middleware is used
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})

router.post('/signup',(req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body;
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
    }
    // quering in our database and finding if we got that user with the email that already exist then we will return with error
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        // else
        bcrypt.hash(password,12) // bigger no. for bigger hash password length, more secured
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()  // mongo database me save ho gaya
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
    // res.json({message:"successfully posted"})
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
          return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // sign - method to generate token
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,email,name} = savedUser
                res.json({token,user:_id,name,email}) // sending token as a response
                // res.json({message:"successfully signed in"})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})



module.exports = router;