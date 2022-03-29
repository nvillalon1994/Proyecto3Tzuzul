
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { get, post ,del,del2,put} from '../api'



export default function Team() {
    const navegate  = useNavigate()
    const {idTeam} =useParams()
    const [modalOpened,setModalOpened] = useState(false)
    const [modalOpened2,setModalOpened2] = useState(false)
    const [modalOpened3,setModalOpened3] = useState(false)
    const [team,setTeam] = useState()
    const [listas,setListas] = useState([])
    const [members, setMembers] = useState([])
    const [usuarioSearch,setUsuarioSearch] =useState([])
    const [show,setShow]= useState(false)

    const search=(event)=>{
        event.preventDefault()
        const{email}=event.target
        // console.log(email.value)
        usuarios.map((usuario)=>{
            if(usuario.email===email.value){
                // console.log("son iguales")
                setUsuarioSearch(usuario)
                setShow(true)
            }
            if(email.value===""){
                
                setUsuarioSearch(usuario)
                setShow(false)
            }
        })
    }
    
    
    
    
    const deleteList = (id)=>{
        console.log(id)
        const newList= listas.map((lista)=>{
            if(lista._id===id){
                console.log(lista)
                del("/teams/"+ idTeam + "/removeList/" + id)
                .then(res=>{
                    get("/teams/"+idTeam)
                    .then(res=>{
                        setTeam(res.data)
                        setListas(res.data.lists)
                        
                        setMembers(res.data.members)
                    })
                  })
                
            }

    })}
    
    const addList = (event) =>{
        event.preventDefault()
        const {name,description} = event.target
        const newList = {
            name:name.value,
            
            description:description.value
        }
        console.log(newList)
        post("/teams/"+ idTeam + "/addList",newList)
        .then(res=>{
            get("/teams/"+idTeam)
            .then(res=>{
                setTeam(res.data)
                setListas(res.data.lists)
                
                setMembers(res.data.members)
            })
          })
        
        setModalOpened(false)
        
        
    }
    const addTask = (event) =>{
        event.preventDefault()
        const {name,description,id,id_lista} = event.target
        const newTask = {
            name:name.value,
            description:description.value,
            assigned:id.value,
        }
        console.log(newTask)
        post("/lists/"+id_lista.value + "/addTask",newTask)
        .then(res=>{
            get("/teams/"+idTeam)
            .then(res=>{
                setTeam(res.data)
                setListas(res.data.lists)
                
                setMembers(res.data.members)
            })
          })
        setModalOpened2(false)
    }
    // const tareas1=listas.map((e)=>e.tasks)
    // console.log(tareas1)
    // tareas1.forEach(element => {
    //     element.map((a)=>{
    //         console.log(a._id)
    //     })
        
    // });
      
    
    
    const deleteTask =(id,id_lista)=>{
        const tareas1=listas.map((e)=>e.tasks)
        tareas1.forEach(element => {
            element.map((a)=>{
                // console.log(a._id)
                if(a._id===id){
                    console.log("son iguales",`idLista: ${id_lista}`,id)
                    
                    del("/lists/"+id_lista+"/removeTask/"+id)
                    .then(res=>{
                        get("/teams/"+idTeam)
                        .then(res=>{
                            setTeam(res.data)
                            setListas(res.data.lists)
                            
                            setMembers(res.data.members)
                        })
                      })
                }
                else{
                    console.log("no son iguales")
                }
            })
            
        });
        
    }



    const addMember = (id) =>{
        
        
        const newMember = {
                idTeam:idTeam,
                idNewMember:id
                
             
        }
        post("/teams/addMember",newMember)
        .then(res=>{
            get("/teams/"+idTeam)
            .then(res=>{
                setTeam(res.data)
                setListas(res.data.lists)
                
                setMembers(res.data.members)
            })
          })
        
        
        
        
    }
    const deleteMember = (id) =>{
        console.log(id)
        console.log(idTeam)
        const delData = {
           idTeam:idTeam,
           idMember: id.value._id
       }
       del2("/teams/removeMember",{data:delData})
       .then(res=>{
        get("/teams/"+idTeam)
        .then(res=>{
            setTeam(res.data)
            setListas(res.data.lists)
            
            setMembers(res.data.members)
        })
      })
       
        
       
}
    
    useEffect(()=>{
        get("/teams/"+ idTeam)
        .then(res=>{
            setTeam(res.data)
            setListas(res.data.lists)
            
            setMembers(res.data.members)
            
        })
        .catch(error=>console.log(error))
    },[])
    
    // console.log(team)
    // console.log(members)
    // // console.log(listas)
    const miembros = members.map((e)=>{
        return e._id
    })
    // console.log(miembros)

    
    const [usuarios, setUsuarios]= useState([])
    useEffect(()=>{
        get("/users")
        .then(res=>{
            setUsuarios(res.data)
            // console.log(res.data)
            
        }
            
            )
        
        .catch(error=>console.log(error))
    },[])
    
    
    
    // console.log(members)
    const [idLista,setIdLista]=useState()
    const tomarIdLista=(id)=>{
        setModalOpened2(true)
        setIdLista(id)
    }

    const [inputList, setInputList] = useState([{ nombre: "", position: "" }]);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
    
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
    
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { nombre: "", position: "" }]);
      };
  return (
    <main className=''>
        
        {team&&<div className='grid grid-cols-4 '>
            
            <div className='col-span-3 m-2'>
                <h1 className='text-5xl mb-5 '>Team: {team.name}</h1>
                <div className='flex'>
                <p className='mx-2 p- text-lg font-semibold'>Members:</p>
                {miembros.map((membe)=><div className='flex mx-2'>
                
                
                <p className='bg-sky-800 w-20 overflow-hidden hover:w-auto p-1 rounded-l-md text-white '>{membe.email}</p>
                
                <button className='bg-sky-600 p-1 rounded-r-md' onClick={()=>{deleteMember(membe._id)}}>x</button>
                </div>)}
                
                </div>
                
            
            <button onClick={()=>{setModalOpened(true)}} className="bg-cyan-600 my-5 p-1 rounded-md text-white hover:bg-cyan-100 " >Agregar List</button>
            <div className='grid grid-cols-3'>
                {team.lists.map((e)=>
                <div className='border bg-sky-300 rounded-md relative h-auto justify-center' key={e._id}>
                    <p className='text-xl m-2'>{e.name}</p>
                    <p className='text-lg m-2'>{e.description}</p>
                    
                    <button onClick={()=>{deleteList(e._id)}} className='text-white mx-1  absolute top-0 right-0 '>X</button>
                    <button className='bg-cyan-600 m-2 p-1 rounded-md text-white hover:bg-cyan-100 ' onClick={()=>{tomarIdLista(e._id)}}>Agregar Tarea</button>
                    {e.tasks.map((task)=>
                    <div className='bg-cyan-500 m-2 relative rounded-md p-3'>
                    
                        <Link to={"/tasks/"+task._id} >

                            <p>{task.name}</p>
                            <p>{task.description}</p>
                            

                            
                        </Link>
                        <button className='text-white mx-1  absolute top-0 right-0 ' onClick={()=>{deleteTask(task._id,e._id)}}>X</button>
                    </div>
                    )}
                    
                    
                    
                    
                </div>)}
            </div>
            
            </div>
            <div className='h-screen overflow-auto border border-r-0 border-t-0 border-b-0 border-sky-300 '>
                <div className='m-'>
                    <h2 className='text-3xl text-center m-2'>Miembros</h2>
                    <form onSubmit={search}>
                        <input type="text" name="email" className='pr-12 pl-2 rounded-sm'/>
                        <button className='relative right-12 rounded-sm  bg-sky-500  bg-opacity-2 '>Buscar</button>
                    </form>
                    {show&&<div className='flex '>
                        
                        <p className='w-30 overflow-hidden'>{usuarioSearch.email}</p>
                        <button onClick={()=>{addMember(usuarioSearch._id)}} className='mx-10 bg-red-800'>Invitar</button>
                    </div>}
                    {!show&&<div className=''>
                        {usuarios.map((usuario)=><div className='flex m-2'>
                            <p className='w-44 overflow-hidden'>{usuario.email}</p>
                            <button onClick={()=>{addMember(usuario._id)}} className='mx-10 bg-red-800'>Invitar</button>
                        </div>)}
                    </div>}
                </div>
                
            </div>
            
            
            
           
            
            
            
            
            
            
            
        </div>}
        {modalOpened2&&<div>
                <div className='absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={()=>{setModalOpened2(false)}}></div>
                
                <div className="bg-white w-1/4 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
                    <button className='absolute right-5 top-5' onClick={()=>{setModalOpened2(false)}}></button>
                    <h2 className='p-5 text-lavender-800 text-3xl font-bold'>Crear nueva Tarea</h2>
                    <form className='flex flex-col p-5' onSubmit={addTask}>
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='name' placeholder='Name...' type="text" />
                        
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='description' placeholder='Description...' type="text" />
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md hidden' name='id_lista' placeholder='Description...' type="text" value={idLista} readOnly />
                        
                        <select name="id" id="">
                            {miembros.map((miembro)=>
                                <option value={miembro._id}>{miembro.name}</option>
                            )}
                        </select>
                        <button className='bg-lavender-900 mt-5 py-4 text-xl font-bold text-lavender-100 rounded-md'>Crear Tarea</button>
                    </form>
                    
                </div>
            </div>}
        {modalOpened&&<div>
                <div className='absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={()=>{setModalOpened(false)}}></div>
                <div className="bg-white w-1/4 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
                    <button className='absolute right-5 top-5' onClick={()=>{setModalOpened(false)}}></button>
                    <h2 className='p-5 text-lavender-800 text-3xl font-bold'>Create a new list</h2>
                    <form className='flex flex-col p-5' onSubmit={addList}>
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='name' placeholder='Name...' type="text" />
                        
                        <input className='p-4 bg-lavender-100 outline-none border focus:border-lavender-600 my-5 rounded-md' name='description' placeholder='Description...' type="text" />
                        <button className='bg-lavender-900 mt-5 py-4 text-xl font-bold text-lavender-100 rounded-md'>Crear Lista</button>
                    </form>
                </div>
            </div>}
    </main>
  )
}
