
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'

import TaskService from '../../services/task.service';

import Delete from '../../materials/icons/delete-red.png';
import CheckCompleteTrue from '../../materials/icons/check-circle-complete.png';
import CheckCompleteFalse from '../../materials/icons/check-circle.png';

import '../../stylesheets/projectUI.css';

const TaskCard = props => {

    const CheckComplete = { CheckCompleteTrue, CheckCompleteFalse };
    const [relevant, setRelevant] = useState(CheckComplete.CheckCompleteFalse);
    const [task, setTask] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        retrieveTasks();
    }, []);

    const retrieveTasks = async () => {
        const responce = await TaskService.findAll()
        setTasks(responce.data);
    };

    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);
    };

    const updateRelevant = (status, currentTask, index, task ) => {
        var data = {
            relevant: status
        }
        TaskService.update(currentTask, data)
            .then(responce => {
                setCurrentTask({ ...task, relevant: status });
                console.log(responce.data);
            })
            .catch(e => {
                console.log(e);
            });
        setRelevant(CheckComplete.CheckCompleteTrue);
    };

    const deleteTask = () => {
        TaskService.remove(currentTask.id_task)
            .then(response => {
                console.log(response.data);
                retrieveTasks();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            {tasks && tasks.map((task, index) => (
                <div className={'task' + (index === currentIndex ? ' active' : '')} key={index}>
                    <div className={'card'}
                        
                        onClick={() => setActiveTask(task, index)}
                    >
                        <div className='title'>
                            <button className='button-add' onClick={() => { updateRelevant(false) }}>
                                <img src={relevant} alt='button-add' />
                            </button>

                            <button onClick={deleteTask} className='button-delete'>
                                <img src={Delete} alt='button-delete' />
                            </button>

                            <h5>{task.title}</h5>
                        </div>
                        <div className="text-muted">
                            <h6>{`Начало: ` + new Date(task.date_start).toLocaleString()}</h6>
                            <h6>{`Конец: ` + new Date(task.date_end).toLocaleString()}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskCard