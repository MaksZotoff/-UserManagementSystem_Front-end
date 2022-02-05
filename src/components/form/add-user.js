import React, { useState, useRef } from "react";
import {useNavigate, Link} from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AdminService from "../../services/admin.service";

import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';
import "bootstrap/dist/css/bootstrap.min.css";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Это поле обязательно для заполнения.
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Неподходящий формат адреса электронной почты.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Имя пользователя должно содержать от 3 до 15 символов.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 4 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Пароль должен быть не короче 4 и не более 20 символов.
            </div>
        );
    }
};



const AddUserForm = () =>{
        const form = useRef();
        const checkBtn = useRef();

        const [username, setUsername] = useState("")
        const [email, setEmail] = useState("")
        const [phone, setPhone] = useState("")
        const [password, setPassword] = useState("")
        const [successful, setSuccessful] = useState(false);
        const [message, setMessage] = useState("");

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
        
        const onChangePassword = (e) => {
            const password = e.target.value;
            setPassword(password);
        };
        



    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AdminService.addUser(username, email, phone, password).then((response) => {
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


        return (
            <div className="container-sm userform">
                <Form className="cardform" onSubmit={handleRegister} ref={form}>
                {!successful && (
                <div>
                    <div className="form-group">
                    <label htmlFor="username">Логин</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={phone}
                            onChange={onChangePhone}
                            validations={[required]}
                        />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />
                    </div>
                    
                    <div className="form-group buttons">
                        <button className="btn btn-outline-success ">Добавить</button>
                            <a>
                                <Link className="linkback" to="/user" >Вернуться назад</Link>    
                            </a>
                    </div>
                </div>
                )}
                    {message && (
                        <div className="form-group message">
                            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                {message}
                            </div>
                            <a>
                                <Link className="linkback" to="/user" >Вернуться назад</Link>    
                            </a>
                        </div>
                    )}
                <CheckButton style={{ display: "none" }} ref={checkBtn}/>

                </Form>
        
            </div>
        );
};


export default AddUserForm