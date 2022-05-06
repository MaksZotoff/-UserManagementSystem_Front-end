import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom';

import AdminService from '../../services/admin.service';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';

import { isEmail } from 'validator';


import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';

const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                Это поле обязательно для заполнения.
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className='alert alert-danger' role='alert'>
                Неподходящий формат адреса электронной почты.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className='alert alert-danger' role='alert'>
                Имя пользователя должно содержать от 3 до 15 символов.
            </div>
        );
    }
};


const AddUserForm = () =>{
        const form = useRef();
        const checkBtn = useRef();
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [role, setRole] = useState('');
        const [successful, setSuccessful] = useState(false);
        const [message, setMessage] = useState('');

        const onChangeUsername = (e) => {
            const username = e.target.value;
            setUsername(username);
        };
        const onChangeEmail = (e) => {
            const email = e.target.value;
            setEmail(email);
        };
        const onChangePhone = (e) => {
            const phone = e.target.value;
            setPhone(phone);
        };
        const onChangeRole = (e) => {
            const role = e.target.value;
            setRole(role);
        };

        const handleRegister = (e) => {
            e.preventDefault();
            setSuccessful(false);
            form.current.validateAll();
            if (checkBtn.current.context._errors.length === 0) {
                AdminService.update(username, email, phone, role).then((response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                }
                );
            }
        };
        
    function ListItem(props) {
        return <option>{props.value}</option>;
    };

    function RoleList(props) {
        const listItems = props.roles.map((name_role, id_role) => 
            <ListItem key={id_role} value={name_role} />
        );
        return (
            <>{listItems}</>
        );
    };

    const roles = ['admin', 'user'];

        return (
            <div className='container-sm userform'>
                <Form className='cardform' onSubmit={handleRegister} ref={form}>
                {!successful && (
                <div>
                    <div className='form-group'>
                    <label htmlFor='username'>Логин</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />
                    </div>
                    
                    <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />
                    </div>
                    
                    <div className='form-group'>
                    <label htmlFor='phone'>Номер телефона</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='phone'
                            value={phone}
                            onChange={onChangePhone}
                            validations={[required]}
                        />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='role'>Роль в системе</label>
                        <Select 
                            name='role'
                            className='form-control'
                            onChange={onChangeRole} 
                            validations={[required]} 
                        >
                        <RoleList roles={roles}/>
                        </Select>
                    </div>
                    
                    <div className='form-group buttons'>
                        <button className='btn btn-outline-success '>Обновить</button>
                        <Link className='linkback' to='/user' >Вернуться назад</Link>    
                    </div>
                </div>
                )}

                {message && (
                        <div className='form-group message'>
                            <div className={ successful ? 'alert alert-success' : 'alert alert-danger' } role='alert'>
                                {message}
                            </div>
                            <Link className='linkback' to='/user' >Вернуться назад</Link>    
                        </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn}/>

                </Form>
            </div>
        );
};


export default AddUserForm