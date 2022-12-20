import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Graph from '../Graphs';
import Login from '../Login';
import Register from '../Register';
import Welcome from '../welcome/Welcome';

const SignIn:FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/welcome' element={<Welcome />}/>
      <Route path='/graphs' element={<Graph />}/>
    </Routes>
  )
}

export default SignIn