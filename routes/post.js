const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("POST")

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")  // populate the "postedBy" key
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const{title,body,pic} = req.body
    if(!title || !body || !pic){
      return res.status(422).json({error:"please add all the fields"})
    }
    // console.log(req.user) 
    // middleware me humne req.user me user data daal diya tha
    // res.send("ok")
    req.user.password = undefined // so that password show na ho post ka, ya its hashed password but still
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}) // get the post of the user who is logged in
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router