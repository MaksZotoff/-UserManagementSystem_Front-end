import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

import TaskService from '../../services/task.service';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import Delete from '../../materials/icons/delete-black.png';
import CheckCompleteTrue from '../../materials/icons/check-circle-complete.png';
import CheckCompleteFalse from '../../materials/icons/check-circle.png';
import '../../stylesheets/projectUI.css';

const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                Это поле обязательно для заполнения.
            </div>
        );
    }
};

const TaskCard = props => {

    const { id_task }= useParams();
    let navigate = useNavigate();

    const initialTasklState = {
        id_task: null,
        title: "",
        relevant: false,
        date_start: "",
        date_end: "",
    };
    const [currentTask, setCurrentTask] = useState(initialTasklState);
    const [message, setMessage] = useState("");

        const getTask = id_task => {
            TaskService.findOne(id_task)
            .then(response => {
                setCurrentTask(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        };

        useEffect(() => {
            if (id_task)
            getTask(id_task);
        }, [id_task]);

        const handleInputChange = event => {
            const { name, value } = event.target;
            setCurrentTask({ ...currentTask, [name]: value });
        };

        const updateRelevant = status => {
            var data = {
                id_task: currentTask.id_task,
                title: currentTask.title,
                date_start: currentTask.date_start,
                date_end: currentTask.date_end,
                relevant: status
            };
            TaskService.update(currentTask.id_task, data)
            .then(response => {
                setCurrentTask({ ...currentTask, relevant: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        };

        const updateTask = () => {
            TaskService.update(currentTask.id_task, currentTask)
            .then(response => {
                console.log(response.data);
                setMessage("Задача обновлена успешно");
            })
            .catch(e => {
                console.log(e);
            });
        };

        const deleteTask = () => {
            TaskService.remove(currentTask.id_task)
                .then(response => {
                console.log(response.data);
                navigate("/task");
            })
            .catch(e => {
                console.log(e);
            });
        };

        return(
        <>
            {currentTask ? (
                <div className='container-sm userform'>
                    <h4>Задача</h4>

                    <Form className='cardform'>
                        <div className="form-group">
                            <label htmlFor="title">Название</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTask.title}
                                onChange={handleInputChange}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_start">Дата начала</label>
                            <Input
                                type="date"
                                className="form-control"
                                id="date_start"
                                name="date_start"
                                value={currentTask.date_start}
                                onChange={handleInputChange}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_end">Дата окончания</label>
                            <Input
                                type="date"
                                className="form-control"
                                id="date_end"
                                name="date_end"
                                value={currentTask.date_end}
                                onChange={handleInputChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Статус:</strong>
                            </label>
                            {currentTask.relevant ? "Выполнена" : "В процессе"}
                        </div>
                    </Form>

                    <div className='form-group buttons'>
                            {currentTask.relevant ? (
                                <button className="btn btn-outline-primary" onClick={() => updateRelevant(false)}>
                                    Изменить статус
                                </button>
                            ) : (
                                <button className="btn btn-outline-primary" onClick={() => updateRelevant(true)}>
                                    Выполнена
                                </button>
                            )}
                            <button className="btn btn-outline-danger" onClick={deleteTask}>
                                Удалить задачу
                            </button>

                            <button type="submit" className="btn btn-outline-success" onClick={updateTask}>
                                Обновить
                            </button>
                            
                            <Link className='linkback' to='/task' >Вернуться назад</Link>    

                    </div>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Выберите задачу</p>
                </div>
            )}
            </>
        );
};
export default TaskCard;