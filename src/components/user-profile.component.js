
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import UserChart from './chart/user-chart'
import avatar from '../materials/avatar.png';
import '../stylesheets/cardUI.css'
import AdminService from '../services/admin.service';

const UserProfile = () => {
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState([]);
  const currentUserRef = useRef();
  currentUserRef.current = currentUser;


  useEffect(() => {
    async function retrieveUser() {
      const responce = await AdminService.findOne(id);
      setCurrentUser(responce.data);
    };
    retrieveUser();
  }, [id]);

  return (
    <>
      <div className='container'>
        <Link className='linkback' to='/user'>Вернуться назад</Link>
        <br/>
        <div className='jumbotron profile' >
          <h4><center>{currentUser.name} {currentUser.surname}</center></h4>
          <img src={avatar} alt='profile-img' className='profile-img-card' />
          <h4>Учетная запись:</h4>
          <h5><strong>Имя пользователя: </strong> {currentUser.username}</h5>
          <h5><strong>Электронная почта: </strong> {currentUser.email}</h5>
          <h5><strong>Номер телефона: </strong> {currentUser.phone}</h5>
        </div>
      </div>
      <div className='container'>
        <h4>Выполнено общих задач</h4>
        <UserChart />
      </div>
    </>
  );
};

export default UserProfile;