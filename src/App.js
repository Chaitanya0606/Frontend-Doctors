
import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Doctor from './Doctor'
import Patient from './Patient'
import Home from './Home'
import Navigate from './Navigate'

export default function App() {
  return (
    <div>
     <BrowserRouter>
     <Navigate/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/patient' element={<Patient/>}/>
      <Route path='/doctor' element={<Doctor/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}
