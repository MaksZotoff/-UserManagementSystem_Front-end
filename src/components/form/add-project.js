import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import ProjectService from '../../services/project.service';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

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

const AddProjectForm = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [title, setTitle] = useState('');

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            ProjectService.addProject(title).then((response) => {
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
        <div className='container-sm userform'>
            <Form className='cardform' onSubmit={handleAddProject} ref={form}>
                {!successful && (
                    <div>
                        <div className='form-group'>
                            <label htmlFor='title'>Название проекта</label>
                            <Input
                                type='text'
                                className='form-control'
                                name='title'
                                value={title}
                                onChange={onChangeTitle}
                                validations={[required]}
                            />
                        </div>

                        <div className='form-group buttons'>
                            <button className='btn btn-outline-success '>Добавить</button>
                            <Link className='linkback' to='/project' >Вернуться назад</Link>
                        </div>
                    </div>
                )}

                {message && (
                    <div className='form-group message'>
                        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role='alert'>
                            {message}
                        </div>
                        <Link className='linkback' to='/project' >Вернуться назад</Link>
                    </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />

            </Form>
        </div>
    );
};


export default AddProjectForm