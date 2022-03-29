import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { del, get, post } from '../api'

function Task() {
  const {idTask}=useParams()
  
  // const [tareas,setTareas]=useState([])

  const addComentario=(event)=>{
    event.preventDefault()
    const{comment,}= event.target
    const newComment = {
      content:comment.value
    }
    console.log(newComment)
    post("tasks/"+idTask+"/addComment",newComment)
    .then(res=>{
      get("/tasks/"+idTask)
      .then(res=>{
        setTareas(res.data)
        setComentarios(res.data.comments)
      })
    })
  }
  const deleteComentario=(id)=>{
    comentarios.map((comment)=>{
      if(comment._id===id){
        console.log("son iguales")
        del("/tasks/"+idTask+"/removeComment/"+id)
        .then(res=>{
          get("/tasks/"+idTask)
          .then(res=>{
            setTareas(res.data)
            setComentarios(res.data.comments)
          })
        })
        
      }
    })
  }
  useEffect(()=>{
      get("/tasks/"+idTask)
      .then(res=>{
          setTareas(res.data)
          setComentarios(res.data.comments)
          
      })
      .catch(error=>console.log(error))
  },[])
  const [tareas,setTareas]=useState([])
  const [comentarios,setComentarios]=useState([])
  console.log(comentarios)
  return (
    <div className='bg-sky-700 rounded-md p-10'>
      <p className='text-white text-3xl mb-4'>{tareas.name}</p>
      <p className='text-white text-xl mb-4'>{tareas.description}</p>
      <h2 className='text-white text-2xl mb-4' >Comentarios</h2>
      {comentarios&&<div className='bg-cyan-200 w-96'>
        
        {comentarios.map((comment)=>
        <div className='flex bg-sky-500'>
          <div>
            <p>{comment.name}</p>
            <img src={comment.file} alt="" />
            <p>hola</p>
            
          </div>
        <p>{comment.content}</p>
        {/* <p>{comment._id}</p> */}
        <button onClick={()=>deleteComentario(comment._id)}>X</button>
        </div>)}
        </div>}
      
      
      <form on onSubmit={addComentario}>
        <input type="text" placeholder='Comentario' name='comment' />
        <button>Agregar Comentario</button>
      </form>
    </div>
  )
}

export default Task