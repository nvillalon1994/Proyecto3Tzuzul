
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import {FaWindowClose} from 'react-icons/fa'
import { Link ,useNavigate} from 'react-router-dom'
import { get, post,del } from '../api'

export default function MyTeams() {
    const navegate = useNavigate()
    const [teams,setTeams] = useState([])
    const [modalOpened,setModalOpened] = useState(false)

    const addTeam = (event) =>{
        event.preventDefault()
        const {name,img,description} = event.target
        const newTeam = {
            name:name.value,
            img:img.value,
            description:description.value
        }
        post("/teams",newTeam)
        .then(res=>{
            setTeams([...teams,res.data])
        })
        setModalOpened(false)
    }
     const deleteTeam = (id)=>{
        // console.log(id)
        const newteams=teams.map((lista)=>{
            if(lista._id===id){
                // console.log(lista)
                del("/teams/"+id)
                .then(res =>{
                    get("/teams")
                    .then(res=>{
                    setTeams(res.data)})})
                
                
                
}
})}
    
    useEffect(()=>{
        get("/teams")
        .then(res=>{
            setTeams(res.data)
            
            
        }
            
            )
        
        .catch(error=>console.log(error))
    },[])
    
    
    
    console.log(teams)
    
    return (
        <div>
            {/* <button onClick={()=>{setModalOpened(true)}} className="bg-cyan-700 p-2 rounded-md text-white">Agregar team</button> */}
            <section className='grid grid-cols-3 gap-5 mt-10 '>
               
                {teams.map(team=><article key={team._id} className='bg-white rounded-md border drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)] hover:drop-shadow-[4px_4px_1px_rgba(0,0,0,0.25)] '>
                    <Link to={"/my_teams/"+team._id}>
                        <div className='p-4'>
                            <h2 className='font-bold text-2xl'>{team.name}</h2>
                            <p>{team.description}</p>
                        </div>
                        <img className='h-48 w-full object-cover object-center rounded-b-md' src={team.img} alt={team.name}/>
                        
                    </Link>
                    <Link to={"/my_teams"}>
                    <button className='absolute top-0 right-0  mr-2 font-bold hover:text-xl' onClick={()=>{deleteTeam(team._id)}} >x</button>
                    </Link>
                    
                </article>)}
                <button onClick={()=>{setModalOpened(true)}} className="bg-cyan-400 p-2 rounded-md text-white hover:drop-shadow-[4px_4px_1px_rgba(0,0,0,0.25)] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)] ">Agregar team</button>
                   
                
                   
            </section>
            {modalOpened&&<div>
                <div className='absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={()=>{setModalOpened(false)}}></div>
                <div className="bg-white w-1/4 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
                    <button className='absolute right-5 top-5' onClick={()=>{setModalOpened(false)}}></button>
                    <h2 className='p-5 text-lavender-800 text-3xl font-bold'>Create a new team</h2>
                    <form className='flex flex-col p-5' onSubmit={addTeam}>
                        <input autoComplete="off" className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='name' placeholder='Name...' type="text" />
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='img' placeholder='Image...' type="text" />
                        <input autoComplete="off" className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='description' placeholder='Description...' type="text" />
                        <button className='bg-lavender-900 mt-5 py-4 text-xl font-bold text-lavender-100 rounded-md'>Crear equipo</button>
                    </form>
                </div>
            </div>}
        </div>
    )
}
