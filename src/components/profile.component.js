/*
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import UserChart from './chart/user-chart'
import avatar from '../materials/avatar.png';
import '../stylesheets/cardUI.css'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='container'>
        <div className='jumbotron profile'>
            <img src={avatar} alt='profile-img' className='profile-img-card' / >
              <strong>Электронная почта:</strong> {currentUser.email}
              <strong>Номер телефона:</strong> {currentUser.phone}
              <strong>Роль в системе:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
        </div>
      </div>
      <div className='container'>
      <h4>Выполнено общих задач</h4>
        <UserChart />
      </div>
    </>
  );
};

export default Profile
*/

import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import UserChart from './chart/user-chart'
import avatar from '../materials/avatar.png';
import '../stylesheets/cardUI.css'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='container'>
        <div className='jumbotron profile'>
            <img src={avatar} alt='profile-img' className='profile-img-card' / >
              <strong>Электронная почта:</strong> {currentUser.email}
              <strong>Номер телефона:</strong> {currentUser.phone}
              <strong>Роль в системе:</strong>
                <ul>
                  {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
          </div>
      </div>
      <div className='container'>
      <h4>Выполнено общих задач</h4>
        <UserChart />
      </div>
    </>
  );
};

export default Profile