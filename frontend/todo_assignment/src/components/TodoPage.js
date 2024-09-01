import React,{useState,useEffect} from 'react'
import TodoItemPage from './TodoItemPage'
import {v4 as uuidv4} from 'uuid'
import './TodoPage.css'
import Cookies from 'js-cookie'
import { useNavigate} from 'react-router-dom'


const TodoPage=()=>{
  const navigate2=useNavigate()

    const [lis,setLis]=useState([])
    const [inp,setInp]=useState('')

    const jwtTkn=Cookies.get('jwtToken')

    const getApi=async ()=>{
      const options={
        method:'GET',
        headers:{
          Authorization:`Bearer ${jwtTkn}` 
        }
      }
      const response=await fetch('http://localhost:3004/todos',options);
      const data=await response.json()
      
      if (response.ok){
        
        setLis(data);
      }

    }

    useEffect(()=>{
      getApi()
    },[])


    const addTask=(event)=>{
       setInp(event.target.value)
    }

    const addTaskToDb=async ()=>{

       const taskObj={
        id:uuidv4(),
        task:inp,
        status:false
       }   

       const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwtTkn}` 

        },
        body:JSON.stringify(taskObj)
       }

       const response=await fetch('http://localhost:3004/todos',options);
       const textData=await response.text()


       if (textData==='ok'){
          setLis((prevLis)=>[...prevLis,taskObj])
          setInp('')
       }


    }

    const delFunc=async (idVal)=>{


        const options={
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwtTkn}` 

          }
        }
         const response=await fetch(`http://localhost:3004/todos/${idVal}`,options)
         const deltextData=await response.text()
         
         if (deltextData==='deleted'){
            const newLis=lis.filter((i)=>i.id!==idVal)
            setLis(newLis)
         }
    }

    const logoutFunc=()=>{
      navigate2('/login')
    }

    const updateApi=async (ident,updObj)=>{

      const options={
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${jwtTkn}` 

          },
          body:JSON.stringify(updObj)
      }
      const response=await fetch(`http://localhost:3004/todos/${ident}`,options)
      const resUpd=await response.text()

      if (resUpd==='updated'){
          const updLis=lis.map((i)=>{
            if (i.id===ident){
              return {...i,status:updObj.status}
            }
            else{
              return i 
            }
          })
          setLis(updLis)
      }

  }


    return(
      <div className='styleCon'>
        <div className='logCon'> 
        <button className='logout' onClick={logoutFunc}> Logout</button>
        </div> 
         <h1 className='head'> Todo  Application </h1>
         <div className='con1'>
         <input type='text' placeholder='Add Task' className='inp' onChange={addTask} value={inp}/>
         <button className='butt' onClick={addTaskToDb}> Add </button>
         </div> 
         <ul className='ul'>
         {
            lis.map((i)=>(<TodoItemPage key={i.id}  obj={i} delFunc={delFunc} updateApi={updateApi}/>))
         }
         </ul> 
      </div> 
    )
}

export default TodoPage