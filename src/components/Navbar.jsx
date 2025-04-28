import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (

    <div>

      <div className='font-bold border-b-1 border-gray-800 mb-5 pb-2'>
        V Developers
      </div>

    <div className='relative flex flex-row items-center  gap-4 place-content-evenly mb-5 overflow-visible max-w-[300px] ml-[100px] 
    p-3 rounded-2xl bg-gray-300 shadow-md shadow-gray
    '>



      <NavLink
      to="/"
       className={({isActive}) => 
        isActive
       ? 'p-2 border-b-3  text-black font-medium '
       : 'p-2 text-purple font-medium'
      }
      //  className='relative p-2 border border-transparent hover:border-white rounded-xl transition-all duration-800
      //    text-purple outline-2 outline-offset-0
      >
        Home
      </NavLink>

      <NavLink
      to="/pastes"
      className={({isActive}) => 
        isActive
       ? 'p-2 border-b-3  text-black font-medium'
       : 'p-2 text-purple font-medium'
      }
      >
        Pastes
      </NavLink>
    </div>
    </div>
  )
}


export default Navbar
