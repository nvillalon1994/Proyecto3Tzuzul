import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem({title,to}) {
  return (
    <li className=' hover:text-white m-0 mr-5 cursor-pointer bg-cyan-500 p-1 rounded-md hover:bg-cyan-600 text-cyan-900 font-semibold drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)] hover:drop-shadow-[4px_4px_1px_#ffffff3f] hover:font-bold'>
        <Link to={to}>{title}</Link>
    </li>
  )
}
