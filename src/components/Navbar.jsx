import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-around bg-gray-200 p-4 text-lg font-medium rounded-2xl mb-2'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pastes">All Pastes</NavLink>
    </div>
  )
}

export default Navbar
