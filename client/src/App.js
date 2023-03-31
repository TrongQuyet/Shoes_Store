import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register';
import {Routes, Route,Navigate } from 'react-router-dom';
function App() {
  return (
    <Routes>
    <Route path="/" element={<Navigate replace to="/home" />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/home" element={<Home />}></Route>
  </Routes>
  );
}

export default App;
