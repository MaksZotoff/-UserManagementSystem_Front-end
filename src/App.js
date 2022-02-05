import React, { useState, useEffect } from "react";
import {  Route, Routes, Link } from "react-router-dom";
import AuthService from "./services/auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css"
import darkStyles from "./stylesheets/darkStyle";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Switch from "@material-ui/core/Switch";

import logo from './materials/logo.png';
import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import NotFound from "./components/notFound.component"
import BoardAdmin from "./components/board/admin-board.component";
import UserBoard from "./components/board/user-board.component";
import EditUser from "./components/form/edit-user";
import AddUserForm from "./components/form/add-user";
import Task from "./components/board/task-board.component";
import Project from "./components/board/project-board.component"


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    if (window[`localStorage`] !== null) {
      window.localStorage.getItem(`theme`) === `dark`
        ? switchDarkTheme()
        : window.localStorage.setItem(`theme`, `light`)
    }

  }, []);

  const switchDarkTheme = () =>{
    window.localStorage.setItem(`theme`, `dark`)
    const style = document.createElement(`style`)
    document.head.appendChild(style)
    style.innerHTML = darkStyles
  }

  const logOut = () => {
    AuthService.logout();
  };

  return(

      <>
      <nav className="navbar navbar-expand navbar-dark bg-dark ">

                <div className="navbar-nav">
                  <a className="navbar-brand" href="/">
                    <img src={logo} width="60" height="30" alt="" / >
                  
                    <li className="nav-item"> 
                      <Link to={"/"} className="nav-link">Главная</Link>
                    </li>
                  </a>
                </div>

            
              {showAdminBoard && (
                <div className="navbar-nav">
                  <li className="nav-item"> 
                      <Link to={"/admin"} className="nav-link">Панель управления</Link> 
                  </li>
                </div>
              )}

              {currentUser && (
                <div className="navbar-nav">
                  <li className="nav-item"> 
                      <Link to={"/user"} className="nav-link">Проекты</Link>  
                  </li>
                </div>
              )}
            
              
              {currentUser ? (
                <div className="navbar-nav">
                        <li className="nav-item"> 
                            <Link to={"/profile"} className="nav-link"> Профиль</Link>
                        </li>

                        <li className="nav-item"> 
                            <a href="/login" className="nav-link" onClick={logOut}>Выйти</a>
                        </li>
                </div>
              ) : (
                    <div className="navbar-nav">
                        <li className="nav-item"> 
                            <Link to={"/login"} className="nav-link">Войти</Link>
                        </li>
                    </div>
              )}

              <div className="navbar-nav"> 
                    <Switch 
                        name = 'theme'
                        onChange={()=>{
                          if(window.localStorage.getItem('theme') === 'dark'){
                            window.localStorage.setItem('theme', 'light')
                          } else{
                            window.localStorage.setItem('theme', 'dark')
                          }
                          window.location.reload()
                        }}
                        checked={window.localStorage.getItem('theme')=== 'dark'}
                    /> 
                    <a style={{color:"#FFFFFF80", fontSize:"18px"}}> тёмная тема</a>
              </div>
      </nav>

{/*
                  <button onClick={() => {
                        window.localStorage.setItem(`theme`, `light`)
                        window.location.reload()
                    }}>go light</button>
                    
                    <button onClick={() => {
                        window.localStorage.setItem(`theme`, `dark`)
                        window.location.reload()
                    }}>go dark</button>
*/}
            <div className="container mt-5">
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/profile" element={<Profile/>} />
                <Route exact path="/admin" element={<BoardAdmin/>} />
                <Route exact path ="/user" element={<UserBoard/>} />
                <Route exact path="/project" element={<Project/>} />                
                <Route exact path="/task" element={<Task/>} />   
                <Route exact path="/adduser" element={<AddUserForm/>} />
                <Route exact path="/update/:id" element={<EditUser/>} />            
                <Route exact path="*" element={<NotFound/>} />
              </Routes>
            </div>
      </>


  );
};

export default App;

