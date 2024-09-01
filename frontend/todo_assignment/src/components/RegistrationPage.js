import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegistrationPage.css'
import {v4 as uuidv4} from 'uuid'

const RegistrationPage=()=>{
    
    const navigate=useNavigate()

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


    const RegApi=async ()=>{

        const regObj={
            id:uuidv4(),
            mailId:email,
            pswrd:password
         }

         const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(regObj)
           }

        const response=await fetch('http://localhost:3004/',options);
        const regRes=await response.text()
        
        if (regRes==='ok'){
           navigate('/login')
        }
        else{
           setRes(true)
        }
    }

    const submitFunc=(event)=>{

       event.preventDefault()

       if (email.trim()==='' || password.trim()===''){
         setErr(true)
       }
       else{
        RegApi()
       }
    }

    return (
        <div className='regCon'>
    <form onSubmit={submitFunc}>
        <h1 className='regHead'> Registration </h1>
        <div className='inp-label'>
            <label htmlFor='email' className='label'> Email* </label>
            <input type='email' placeholder='Enter your email' id='email' className='inpEle' onChange={mailFunc} value={email}/>
        </div>
        <div className='inp-label'>
            <label htmlFor='password' className='label'> Password* </label>
            <input type='password' placeholder='Enter your Password' id='password' className='inpEle' onChange={pswdFunc} value={password}/>
        </div>
        
        <div className='butCon'>
        <button className='regButt' type='submit'> Register </button>
        </div> 
        <p className='err'> {err?'* fields are required':''}</p>
        <p className='err'>{result?'User Already Exists':''} </p>
    </form>
    </div> 
    )
}

export default RegistrationPage