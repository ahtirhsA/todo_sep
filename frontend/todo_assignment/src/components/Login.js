import React,{useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login=()=>{

    const navigate1=useNavigate()

    const [email,setEmail]=useState('')
    const [password,setpswd]=useState('')
    const [err,setErr]=useState(false)
    const [result,setRes]=useState(false)

    const mailFunc=(event)=>{
        setEmail(event.target.value)
    }

    const pswdFunc=(event)=>{
        setpswd(event.target.value)
    }

    const setInCookies=(tkn)=>{
        Cookies.set('jwtToken',tkn,{expires:365});
        navigate1('/todos')
    }


    const LoginApi=async ()=>{

        const LoginObj={
            mailId1:email,
            pswrd1:password
         }

         const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(LoginObj)
           }

        const response=await fetch('http://localhost:3004/login',options);
        


        if (response.ok===true){

          
            const LoginRes=await response.json()


            setInCookies(LoginRes.jwtToken)
     
           
        }
        else if(response.status===401){
            setRes('Invalid Password')
        }
        else{
            setRes('User Does Not Exists')
        }
        
        
    }

    const submitFunc=(event)=>{

       event.preventDefault()

       if (email.trim()==='' || password.trim()===''){
         setErr(true)
       }
       else{
        LoginApi()
       }
    }

    return (
        <div className='regCon'>
    <form onSubmit={submitFunc}>
        <h1 className='regHead'> Login </h1>
        <div className='inp-label'>
            <label htmlFor='email' className='label'> Email* </label>
            <input type='email' placeholder='Enter your email' id='email' className='inpEle' onChange={mailFunc} value={email}/>
        </div>
        <div className='inp-label'>
            <label htmlFor='password' className='label'> Password* </label>
            <input type='password' placeholder='Enter your Password' id='password' className='inpEle' onChange={pswdFunc} value={password}/>
        </div>
        
        <div className='butCon'>
        <button className='regButt' type='submit'> Login </button>
        </div> 
        <p className='err'> {err?'* fields are required':''}</p>
        <p className='err'>{result} </p>
    </form>
    </div> 
    )
}

export default Login 