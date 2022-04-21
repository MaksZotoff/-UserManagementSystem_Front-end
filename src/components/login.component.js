import React, { useState, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';

import '../stylesheets/cardUI.css';
import avatar from '../materials/avatar.png';

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Поле обязательно для заполнения.
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


    const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    form.current.validateAll();


  if (checkBtn.current.context._errors.length === 0) {
    AuthService.login(username, password).then(
      () => {
        navigate('/profile')
          window.location.reload();
        },
        (error) => {
          const resMessage = 
              (error.responce && 
              error.response.data && 
              error.response.data.message) || 
              error.message || 
              error.toString();

              setLoading(false);
              setMessage(resMessage);
        }
    );
  } else { setLoading(false); }
  };

  return (
    <div className='col-md-12'>
      <div className='cardlogin'>
        <img src={avatar} alt='profile-img' className='profile-img-card' / >

        <Form onSubmit={handleLogin} ref={form}>
        
        
          
          <div className='form-group'>
            <label htmlFor='username'>Логин</label>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className='form-group'>
          <label htmlFor='password'>Пароль</label>
            <Input
              type='password'
              className='form-control'
            
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className='form-group buttons'>
            <button className='btn btn-outline-success w-100' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
              <span>Войти</span>
            </button>
          </div>

          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        
      </div>
    </div>
  );
};

export default Login
