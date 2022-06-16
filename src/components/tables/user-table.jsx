import React, { useState, useEffect } from 'react';
import AdminService from '../../services/admin.service';
import '../../stylesheets/cardUI.css';
import Table from 'react-bootstrap/Table'

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = async () => {
        const responce = await AdminService.findAll()
        setUsers(responce.data);
    };


    return (
        <>
            <div className='usertable'>
                <h3>Пользователи</h3>
                <Table striped bordered hover responsive>
                    <thead >
                        <tr >
                            <th >Имя</th>
                            <th >Фамилия</th>
                            <th >Логин</th>
                            <th >Электронная почта</th>
                            <th >Номер телефона</th>
                            <th >Зарплата</th>

                        </tr>
                    </thead>
                    <tbody >
                        {users.map((users) =>
                            <tr key={users.id_user}>
                                <td>{users.name}</td>
                                <td>{users.surname}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.phone}</td>
                                <td>{users.salary}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>

    );
}

export default UserTable