import React from "react";
import { Navigate } from 'react-router-dom';
import  AuthService from "../services/auth.service";

const Profile = () => {
  const  currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header style={{margin: "30px"}}>
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

        <h3> <center>
          <strong>{currentUser.username}</strong> Профиль
        </center> </h3>
      </header>

      <div class="cardform">

      <p>   <strong>Email:</strong> {currentUser.email}    </p>
      <p>   <strong>Номер телефона:</strong> {currentUser.phone}    </p>
      <strong>Роли в системе:</strong>

      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      </div>
    </div>
  );
};

export default Profile
