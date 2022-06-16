import React, { useState, useEffect } from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import AuthService from './services/auth.service';
import {Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import './stylesheets/App.css'
import darkStyles from './stylesheets/darkStyle';

import Switch from '@material-ui/core/Switch';
import logo from './materials/line_logo_white.png';

import Login from './components/login.component';
import Home from './components/home.component';
import UserProfile from './components/boards/profile-board.component';
import NotFound from './components/notFound.component'

import BoardAdmin from './components/boards/admin-board.component';
import UserBoard from './components/boards/user-board.component';
import ProjectBoard from './components/boards/project-board.component';
import TaskBoard from './components/boards/task-board.component';
import BriefBoard from './components/boards/brief-board.component';

import AddUserForm from './components/forms/add-user';
import AddProjectForm from './components/forms/add-project';
import AddTaskForm from './components/forms/add-task';

import EditUser from './components/forms/edit-user';
import EditProject from './components/forms/edit-project';

import Task from './components/cards/taskUI';



import Board from './components/boards/projects/board';






const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
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

      <nav className='navbar navbar-expand navbar-dark bg-dark '>
        <div className='navbar-nav'>
          <a className='navbar-brand' href='/'>
            <img src={logo} width='60' height='60' alt='' / >
          </a>
            <li className='nav-item'> 
              <Link to={'/'} className='nav-link'>Главная</Link>
            </li>
        </div>
      {showAdminBoard && (
        <>
        <div className='navbar-nav'>
          <li className='nav-item'> 
              <Link to={'/admin'} className='nav-link'>Панель управления</Link> 
          </li>
          </div>
          <div className='navbar-nav'>
          <li className='nav-item'> 
              <Link to={'/user'} className='nav-link'>Сотрудники</Link> 
          </li>
          <li className='nav-item'> 
              <Link to={'/task'} className='nav-link'>Задачи</Link> 
          </li>
        </div>
      </>
      )}
      {currentUser && (
        <div className='navbar-nav'>
          <li className='nav-item'> 
            <Link to={'/brief'} className='nav-link'>Персональные задачи</Link>  
          </li> 
          <li className='nav-item'> 
            <Link to={'/project'} className='nav-link'>Проекты</Link>  
          </li>
        </div>
      )}
      {currentUser ? (
        <>
        <div className='navbar-nav'>
          <li className='nav-item'> 
              <Link to={`/user/${currentUser.id}`} className='nav-link'> Профиль</Link>
          </li>
          <li className='nav-item'> 
              <a href='/login' className='nav-link' onClick={logOut}>Выйти</a>
          </li>
        </div>
        </>
      ) : (
        <div className='navbar-nav'>
            <li className='nav-item'> 
                <Link to={'/login'} className='nav-link'>Войти</Link>
            </li>
        </div>
      )}
      <div className='navbar-nav'> 
        <Switch 
            name = 'theme'
            onChange={()=>{
              if(window.localStorage.getItem('theme') === 'dark'){
                window.localStorage.setItem('theme', 'light')
              } else{   window.localStorage.setItem('theme', 'dark')
              }
              window.location.reload()
            }}
            checked={window.localStorage.getItem('theme')=== 'dark'}
        /> 
        <div style={{color:'#FFFFFF80', fontSize:'16px'}}>Тема</div>
      </div>
      </nav>

{/*
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href="/">
            <img src={logo} width='60' height='60' alt='' / >
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content: space-between'>
            <Nav  className="me-auto">
                {currentUser && (
                <>
                    <Nav.Link><Link to={'/brief'}>Персональные задачи</Link></Nav.Link>
                    <Nav.Link><Link to={'/project'}>Проекты</Link></Nav.Link>
                </>
                )}
                {showAdminBoard && (
                <NavDropdown bg="dark" variant="dark" title="Управление" id="collasible-nav-dropdown">
                    <NavDropdown.Item><Link to={'/admin'}>Панель управления</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to={'/user'}>Сотрудники</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to={'/task'}>Задачи</Link></NavDropdown.Item>
                </NavDropdown>
                )}

            </Nav>
            <Nav>
            {currentUser ? (
                <>
                    <Nav.Link><Link to={`/user/${currentUser.id}`}>Профиль</Link></Nav.Link>
                    <Nav.Link href='/login' className='nav-link' onClick={logOut}>Выйти</Nav.Link>
                </>
                ) : (
                <>
                    <Nav.Link><Link to={`login`}>Войти</Link></Nav.Link> 
                </>
                )}
                
            </Nav>
        </Navbar.Collapse>
        
    </Container>
</Navbar>
*/}
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/user/:id' element={<UserProfile/>} />      
          <Route exact path='/admin' element={<BoardAdmin/>} />
          <Route exact path ='/user' element={<UserBoard/>} />
          <Route exact path='/task' element={<TaskBoard/>}/>                
          <Route exact path='/project' element={<ProjectBoard/>} /> 
          <Route exact path='/brief' element={<BriefBoard/>}/>               
          <Route exact path='/adduser' element={<AddUserForm/>} />
          <Route exact path='/addproject' element={<AddProjectForm/>} />
          <Route exact path='/addtask' element={<AddTaskForm/>} />
          <Route exact path='/user/update/:id' element={<EditUser/>} />      
          <Route exact path='/project/update/:id' element={<EditProject/>} />            
          <Route exact path='/task/update/:id' element={<Task/>}/>
          <Route exact path='*' element={<NotFound/>} />

          <Route exact path='/board' element={<Board/>} />

        </Routes>

      </>
  );
};
export default App;