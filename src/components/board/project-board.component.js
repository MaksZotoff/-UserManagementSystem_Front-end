

import React, { useState, useEffect, useRef } from "react";
import UserCardUI from "../card/user-cardUI";
import {Link} from "react-router-dom";


import AdminService from "../../services/admin.service";

import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';

import "bootstrap/dist/css/bootstrap.min.css";

const UserBoard = () =>{
/*
        const initialUserState = {
            id_user: null,
            username: "",
            email: "",
            phone: "",
        };
        const [currentUser, setCurrentUser] = useState(initialUserState);
        const [message, setMessage] = useState("");

        const getUser  = id_user => {
            AdminService.findOne(id_user)
            .then(response => {
                    setCurrentUser(response.data);
            })
            .catch(e=>{
                console.log(e);
        });
    };

    useEffect( () => {
        getUser(props.match.params.id_user);
    }, [props.match.params.id_user]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };
    

    const updatePublished = id_user=> {
        var data = {
            id_user: currentUser.id_user,
            username: currentUser.username,
            phone: currentUser.phone
        };

        AdminService.update(currentUser.id_user, data)
        .then(response => {
            setCurrentUser( {...currentUser});
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    
    }

    const updateUser = () => {
        AdminService.update(currentUser.id_user, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage('Пользователь обновлен успешно')
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        AdminService.remove(currentUser.id_user)
            .then(response => {
                console.log(response.data);
                props.history.push("/user");
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div className="container-fluid">
            <div className="edit-form">
                <h3>Пользователи</h3>
            
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={currentUser.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            value={currentUser.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>


                <button className="badge badge-danger mr-2" onClick={deleteUser}>
                    Delete
                </button>

                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateUser}
                >
                    Update
                </button>
                <p>{message}</p>
            </div>

        </div>
    );
};
export default UserList;

*/
        const [users, setUsers] = useState([]);
        const [message, setMessage] = useState("");
        
        const usersRef = useRef();
        usersRef.current = users;

        useEffect(() => {
            retrieveUsers();
        }, []);

        const retrieveUsers  = async() => {
            const responce = await AdminService.findAll()
            setUsers(responce.data);
        };

        const updateUser = async() => {
            await AdminService.update(users.id_user, users)
        };



        return (
            <div className="container-fluid">
                <div className="card cardbutton">
                    <Link to="/adduser" className="btn btn-outline-success">Добавить пользователя</Link>    
                </div>

                <div className="row">
                        {users && users.map((user, id_user) => {
                            
                            const deleteUser = async() => {
                                await AdminService.remove(user.id_user);
                                retrieveUsers();
                            };
                            
                            return (
                                <div className="col-md-4" key={id_user}>
                                    <UserCardUI name={user.username} email={user.email} phone={user.phone} linkUPD={`/update/${user.id_user}`} linkDEL={deleteUser}/>
                                        {/*linkDEL={()=> AdminService.remove(user.id_user)}*/}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
};
export default UserBoard
