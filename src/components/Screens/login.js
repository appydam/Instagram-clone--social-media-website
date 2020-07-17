import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Login=()=>{
    const history=useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html: "invalid email", classes:"#f44336 red"})
             return;
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                M.toast({html:"Signed In Successfully",classes:"#00e676 green accent-3"})
                history.push('/')
            }
            // console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        // <h1>its my login </h1>
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="text" placeholder="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" 
                onClick={()=>PostData()}
                >
                    Log In
                </button>
                <h5>
                    <Link to='/signup'>Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login