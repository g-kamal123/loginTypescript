import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Connect from '../connect/Connect';
import Faqs from '../faqs/Faqs';
import Graph from '../Graphs';
import Listing from '../listing';
import Login from '../Login';
import Register from '../Register';
import Welcome from '../welcome/Welcome';

const SignIn:FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/welcome' element={<Welcome />}/>
      <Route path='/connect' element={<Connect />}/>
      <Route path='/graphs' element={<Graph />}/>
      <Route path='/listing' element={<Listing />}/>
      <Route path='/faqs' element={<Faqs />}/>
    </Routes>
  )
}

export default SignIn