const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const {MONGOURI} = require('./keys');


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahhhh");
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err);
})



require('./models/user')
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))






// const customMiddleWare = (req,res,next)=>{
//     console.log("middleware executed !!")
//     next(); // yeh nhi lagaya toh site load hoti rahegi
// }
// middleware can be used  where there is login required to do things into the app


// ese likhne se middleware sab pe implement hoga
// app.use(customMiddleWare);

// app.get('/home',(req,res)=>{
//     console.log("homeee")
//     res.send("Hello World");
// })

// ab middleware khli ispe implement hoga
// app.get('/about',customMiddleWare,(req,res)=>{
//     console.log("about ")
//     res.send("about page");
// })


 
app.listen(port,()=>{
    console.log("server is running on the port",port);
})