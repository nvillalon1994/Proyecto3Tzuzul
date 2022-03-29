
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from '../api'

export default function Users() {
    const [usuarios, setUsuarios]= useState([])
    const [show,setShow] = useState(false)
    useEffect(()=>{
        get("/users")
        .then(res=>{
            setUsuarios(res.data)
            // console.log(res.data)
            
        }
            
            )
        
        .catch(error=>console.log(error))
    },[])
    // console.log(usuarios)
    const [usuarioSearch,setUsuarioSearch] =useState([])
    const search=(event)=>{
        event.preventDefault()
        const{email}=event.target
        console.log(email.value)
        usuarios.map((usuario)=>{
            if(usuario.email===email.value){
                console.log("son iguales")
                setUsuarioSearch(usuario)
                setShow(true)
            }
            if(email.value===""){
                console.log("esta bacio")
                setUsuarioSearch(usuario)
                setShow(false)
            }
        })
    }
    
    
  return (
    <div>
        <form onSubmit={search}>
            <input type="text" name="email" className='pr-12'/>
            <button className='relative right-12 '>Buscar</button>
        </form>
        {show?<div>
            <p>Encontramos a: {usuarioSearch.email}</p>
            
        </div>:
        <div>
            {usuarios.map((usuario)=>
            <div>
                <p>{usuario.email}</p>
                
            </div>
        )}
        </div>}
        {}
        
    </div>
  )
}
