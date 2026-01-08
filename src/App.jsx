import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '../src/component/Layout/MainLayout'

const App = () => {
  return (
  
    <BrowserRouter>
    <Routes>
    <Route path='/' element ={<MainLayout/>}>
    
    <Route/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App