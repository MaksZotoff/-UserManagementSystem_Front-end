import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';

import AdminService from '../../services/admin.service';
import UserCardUI from '../card/user-cardUI';

import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';

const UserBoard = () =>{

        const [users, setUsers] = useState([]);
        
        const usersRef = useRef();
        usersRef.current = users;

        useEffect(() => {
            retrieveUsers();
        }, []);

        const retrieveUsers  = async() => {
            const responce = await AdminService.findAll()
            setUsers(responce.data);
        };

        return (
            <div className='container-fluid'>
                <div className='row'>
                        {users && users.map((user, id_user) => {
                            
                            const deleteUser = async() => {
                                await AdminService.remove(user.id_user);
                                retrieveUsers();
                            };
                            
                            return (
                                <div className='col-md-3' key={id_user}>                                   
                                    <UserCardUI 
                                        name={user.username} 
                                        email={user.email} 
                                        phone={user.phone} 
                                        linkUPD={`/user/update/${user.id_user}`} 
                                        linkDEL={deleteUser}
                                    />
                                </div> 
                            );
                        })}
                        <div className='card text-center shadow '>
                            <div className='card-body text-dark'>
                                <Link to='/adduser' className='btn btn-outline-success'>Добавить пользователя</Link>    
                            </div>
                        </div>
                </div>
            </div>
        );
};
export default UserBoard