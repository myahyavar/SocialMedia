import './App.css';
import {Home} from './Home';
import {Group} from './Group';
import {Participant} from './Participant';
import {BrowserRouter, Routes ,Route, NavLink, Router} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from './userSlice';
//import { authActions } from '_store';

function Nav() {
  const user= useSelector(selectUser);
  //const authUser = useSelector(x => x.auth.user);
  //const dispatch = useDispatch();
  //const logout = () => dispatch(authActions.logout());
  const dispatch= useDispatch();
  const handleLogout=(e)=>{
    e.preventDefault();

    dispatch(logout());
  };

  const [color,setColor] = useState("white");
  const click =color=>{
    setColor(color)
  }
  useEffect(()=>{
    document.body.style.backgroundColor=color
  }, [color])
  //if (!user) return null;
  return (
    <BrowserRouter>
    <nav className="navbar  bg-dark navbar-dark">
      <h3  className="d-flex justify-content-center m-3 " >
        Cool Social Media For Cool People 
      <span role="img" aria-label="glasses">😎</span>
      </h3>
      </nav>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-dark " onClick={(e)=>handleLogout(e)}>
              Logout
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-dark " to="/Group">
              Group
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-dark " to="/Participant">
              Participant
            </NavLink>
          </li>
        </ul>
        <button className="btn btn-dark btn-outline-primary " style={{Float: "right"}} onClick={
        ()=>click("gray")
        }>Change Background</button>
      </nav>
      <div className="App container" >
       
      <Routes>
         <Route path='/' element={<Group/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Group' element={<Group/>}/>
        <Route path='/Participant' element={<Participant/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default Nav;
