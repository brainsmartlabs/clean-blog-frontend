import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import AddBlog from './components/AddBlog.js';
import MyBlogs from './components/MyBlogs.js';
import BlogDetail from './components/BlogDetail.js';
import Home from './components/Home.js';
import Register from './components/Register';
import OtherBlogs from './components/OtherBlogs';
import Login from './components/Login.js';
import Logout from './components/Logout';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.Fragment>
      <header>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/auth/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/auth/newUser" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/blogs/add" element={<AddBlog isLoggedIn={isLoggedIn}/>} />
          <Route path="/myBlogs" element={<MyBlogs />} />
          <Route path="/otherBlogs/:id" element={<OtherBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}


export default App;
