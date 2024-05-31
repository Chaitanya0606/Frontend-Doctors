import React from 'react'
import { Link } from 'react-router-dom'

const Navigate = () => {
  return (
    <nav className='navbar' style={{backgroundColor:"lightblue"}}>
      <a id="logo">Health<span>Care +</span></a>
      <Link to="/">Home</Link>
      <Link to="/doctor">Doctors</Link>
      <Link to="/patient">Patients</Link>      
    </nav>
  )
}

export default Navigate