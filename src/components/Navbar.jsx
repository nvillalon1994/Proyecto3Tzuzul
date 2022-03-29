import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import NavItem from './NavItem';


export default function Navbar() {

    const {logged} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const [open,setOpen] = useState(true)

    const signOut = () =>{
        dispatch(logout())
      }

  return (
    <nav className="bg-cyan-200 py-3 mb-5 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]">
        <div className='max-w-screen-xl mx-auto flex justify-between relative'>
          <Link to="/"><p className='ml-2 text-xl text-white font-semibold hover:text-2xl drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]'>Workflow</p></Link>
          <ul className={`${open?"block":"hidden"} bg-lavender-500 md:bg-transparent text-right md:flex absolute right-0 top-7 md:static p-2 pl-10 md:p-0 md space-y-2 md:space-y-0`}>
              
              {logged&&<NavItem to="/my_teams" title={"My teams"}/>}
              {/* {logged&&<NavItem to="/users" title={"USERS"}/>} */}

              {logged?<li className='text-lavender-900 hover:text-white m-0 mr-5 cursor-pointer bg-cyan-500 p-1 rounded-md hover:bg-cyan-600 text-cyan-900 font-semibold drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)] hover:drop-shadow-[4px_4px_1px_#ffffff3f]' onClick={signOut}>LogOut</li>:<NavItem to="/login" title={"LogIn"}/>}
          </ul>
          <button onClick={()=>{setOpen(!open)}} className='block md:hidden mr-2 md:mr-0'>
            boton
            {open?<div className='h-5 w-5'></div>:<div className='h-5 w-5'/>}</button>
        </div>
    </nav>
  )
}
