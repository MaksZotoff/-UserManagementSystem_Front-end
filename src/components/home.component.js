import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

import "../stylesheets/App.css";
import "../stylesheets/cardUI.css";


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (responce)=>{
        setContent(responce.data);
      },
      (error) => {
        const content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        setContent(content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h4>{content}</h4>
      </header>
    </div>
  );
};

export default Home