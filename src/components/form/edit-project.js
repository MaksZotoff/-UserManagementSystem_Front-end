import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import ProjectService from '../../services/project.service';

import '../../stylesheets/App.css';
import '../../stylesheets/cardUI.css';

const EditProject = (props) =>{
        const initialProjectlState = {
            id_project: null,
            title: '',
            date_start: '',
            date_end: '',
        };

        const [project, setProject]= useState(initialProjectlState);
        const [message, setMessage] = useState('');
        
        const form = useRef();
        const checkBtn = useRef();

        const findOne = id_project => {
            ProjectService.findOne(id_project)
            .then(responce => {
                setProject(responce.data);
                console.log(responce.data);
            })
            .cath(e => {
                console.log(e);
            });
        };

        useEffect(() => {
            findOne(props.id_project);
        },[props.id_project]);

        const handleInputChange = event => {
            const { name, value } = event.target;
            setProject({ ...project, [name]: value });
        };
        const updateProject = () => {
            ProjectService.update(project.id_project, project)
                .then(response => {
                    console.log(response.data);
                    setMessage(message);
                })
                .cath(e => {
                    console.log(e);
                });
            };

        return (
            <div className='container-sm projectform'>
                <Form className='cardform' ref={form}>
                <>
                    <div className='form-group'>
                    <label htmlFor='title'>Название проекта</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='title'
                            value={project.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='date_start'>Дата начала</label>
                        <Input
                            type='date'
                            className='form-control'
                            name='date_start'
                            value={project.date_start}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='date_end'>Дата окончания</label>
                        <Input
                            type='date'
                            className='form-control'
                            name='date_end'
                            value={project.date_end}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-group buttons'>
                        <button className='btn btn-outline-success' onClick={updateProject}>Обновить</button>
                        <Link className='linkback' to='/project' >Вернуться назад</Link>                       
                    </div>
                </>

                <CheckButton style={{ display: 'none' }} ref={checkBtn}/>
                </Form>
        
            </div>
        );
};

export default EditProject