import React from 'react'
import {GiTeamDowngrade} from 'react-icons/gi'
import {FcParallelTasks} from 'react-icons/fc'
import {FcCollaboration} from 'react-icons/fc'


export default function Home() {
  return (
    <div className=' grid grid-cols-2'>
      <div className=" bg-[url('/src/image/fondo.png')] bg-contain bg-no-repeat bg-top mt-28 rounded-3xl relative ">
        
      </div>
      <div className='ml-10'>
        <h1 className='text-5xl my-20  text-center drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]'>Assemble Teams without any problems </h1>
        <p className='text-xl  text-center drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]'>Connect with your co-workers in a more efficient way</p>
        <div className='grid grid-cols-3 mt-20 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)] hover'>
            <div className='rounded-xl p-3 text-center  bg-cyan-50 '>
              <h1 className=''>Create Teams</h1>
              <GiTeamDowngrade className='text-8xl  m-auto text-sky-500'/>
            </div>
            <div className='rounded-xl p-3 text-center mx-2 bg-cyan-50'>
              <h1>Divide Tasks</h1>
              <FcParallelTasks className='text-8xl m-auto'/>
            </div>
            <div className='rounded-xl p-3 text-center mx-2 bg-cyan-50'>
              <h1>Start Working!</h1>
              <FcCollaboration className='text-8xl m-auto '/>
            </div>
          
        </div>
      </div>
    </div>
    
  )
}
