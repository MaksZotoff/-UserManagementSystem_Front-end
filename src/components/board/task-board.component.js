import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from '../../services/task.service';
import { Link } from 'react-router-dom';

import Delete from '../../materials/icons/delete-black.png';
import CheckCompleteTrue from '../../materials/icons/check-circle-complete.png';
import CheckCompleteFalse from '../../materials/icons/check-circle.png';
import '../../stylesheets/projectUI.css';

const TaskList = props => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    
    const { id_task }= useParams();
    let navigate = useNavigate();

    useEffect(() => {
        retrieveTasks();
    }, []);

    const retrieveTasks = () => {
        TaskService.findAll()
        .then(response => {
            setTasks(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);
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
        <div className="list row">

            <div className="col-md-8">
                <h4>Всего задач:</h4>
                <ul className="list-group">
                    {tasks &&
                        tasks.map((task, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTask(task, index)}
                                key={index}
                            >
                                {task.title}
                            </li>
                        ))}
                </ul>
            </div>

            <div className="col-md-4">

                    {currentTask ? (
                        <div className='cardform'>
                            <h4>Задача</h4>
                            <div>
                                <label>
                                    <strong>Название:</strong>
                                </label>{" "}
                                {currentTask.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Дата начала:</strong>
                                </label>{" "}
                                {currentTask.date_start}
                            </div>
                            <div>
                                <label>
                                    <strong>Дата окончания:</strong>
                                </label>{" "}
                                {currentTask.date_end}
                            </div>
                            <div>
                                <label>
                                    <strong>Статус:</strong>
                                </label>{" "}
                                {currentTask.relevant ? "Выполнена" : "В процессе"}
                            </div>

                            <div className='form-group buttons'>
                                <Link
                                    to={"/task/update/" + currentTask.id_task} className="btn btn-outline-primary">
                                    Изменить
                                </Link>
                                <button className="btn btn-outline-danger" onClick={deleteTask}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите задачу</p>
                        </div>
                    )}
            </div>
        </div>
    );

}

export default TaskList;