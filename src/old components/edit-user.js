/*
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminService from "../../services/admin.service";
import '../../stylesheets/projectUI.css';
import Form from 'react-validation/build/form';

const EditUser = (props) => {
    const { id_user }= useParams();
    let navigate = useNavigate();        
    const form = useRef();


    const initialUserState = {
        id_user: null,
        email: '',
        phone: '',
        username: ''
      };
      const [currentUser, setCurrentUser] = useState(initialUserState);
      const [message, setMessage] = useState("");

      const getUser = id_user => {
        AdminService.findOne(id_user)
          .then(response => {
            setCurrentUser(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        if (id_user)
        getUser(id_user);
      }, [id_user]);

      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
      };
    
      const updateRelevant = status => {
        var data = {
          id_user: currentUser.id_user,
          email: currentUser.email,
          phone: currentUser.phone,
          username: currentUser.username
        };
        AdminService.update(currentUser.id_user, data).then(response => {
            setCurrentUser({ ...currentUser, relevant: status });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
      };
      const updateUser = () => {
        AdminService.update(currentUser.id_user, currentUser)
          .then(response => {
            console.log(response.data);
            setMessage("Пользователь обновлен успешно");
          })
          .catch(e => {
            console.log(e);
          });
      };
      const deleteUser = () => {
        AdminService.remove(currentUser.id_user)
          .then(response => {
            console.log(response.data);
            navigate("/user");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
    return(
        <div className='container-sm userform'>
            {currentUser ? (
                <div className="edit-form">
                <h4>Пользователь</h4>
                <Form className='cardform' ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефона</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={currentUser.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={currentUser.username}
                            onChange={handleInputChange}
                        />
                    </div>

                </Form>

                <button className="badge badge-danger mr-2" onClick={deleteUser}>
                    Удалить
                </button>

                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateUser}
                >
                    Обновить
                </button>
                <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Выберите пользователя</p>
                </div>
            )}
            </div>
    );
}

export default EditUser


/*
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AdminService from '../../services/admin.service';

import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';

const EditUser = (props) =>{
    const { id_user }= useParams();

        const [user, setUser]= useState(props.user);
        const [message, setMessage] = useState('');
        
        const form = useRef();
        const checkBtn = useRef();

        const findOne = id_user => {
            AdminService.findOne(id_user)
            .then(responce => {
                setUser(responce.data);
                console.log(responce.data);
            })
            .cath(e => {
                console.log(e);
            });
        };

        useEffect(() => {
            if (id_user)
                findOne(id_user);
        },[id_user]);

        const handleInputChange = e => {
            const { username, value } = e.target;
            setUser({ ...user, [username]: value });
        };
        const updateUser = () => {
            AdminService.update(user.id_user, user)
                .then(response => {
                    console.log(response.data);
                    setMessage(message);
                })
                .cath(e => {
                    console.log(e);
                });
            };

        return (
            <div className='container-sm userform'>
                <Form className='cardform' ref={form}>
                <>
                    <div className='form-group'>
                    <label htmlFor='username'>Логин</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='username'
                            value={user.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='email'
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='phone'>Номер телефона</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='phone'
                            value={user.phone}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className='form-group'>
                    <label htmlFor='password'>Пароль</label>
                        <Input
                            type='password'
                            className='form-control'
                            name='password'
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group buttons'>
                        <button className='btn btn-outline-success' onClick={updateUser}>Обновить</button>
                        <Link className='linkback' to='/user' >Вернуться назад</Link>    
                    </div>
                </>

                <CheckButton style={{ display: 'none' }} ref={checkBtn}/>
                </Form>
        
            </div>

        );
};

export default EditUser
*/