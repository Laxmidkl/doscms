import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../src/component/Layout/MainLayout";
import Banner from "../src/component/banner/HomeBanner";
import Home from "./component/pages/Home";
import Blog from "../src/component/pages/Blog"
import About from "./component/pages/About";
import Events from "./component/pages/Events";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route path="" element ={<Home/>}/>
        <Route path="/blog" element ={<Blog/>}/>
        <Route path="/about" element ={<About/>}/>
        <Route path="/event" element ={<Events/>}/>
        <Route path="/banner" element ={<Banner/>}/>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
