import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './HOC/Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Gallery from './Pages/Gallery'
import Courses from './Pages/Courses'
import Events from './Pages/Events'
import Contact from './Pages/Contact'
import BookNow from './Pages/BookNow'

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route path='' element ={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/blog' element={<Blog/>}/>
    <Route path='/gallery' element={<Gallery/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/events' element={<Events/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/book' element={<BookNow/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App