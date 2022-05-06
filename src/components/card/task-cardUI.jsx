import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TaskService from '../../services/task.service';

import Delete from '../../materials/icons/delete-black.png';
import CheckCompleteTrue from '../../materials/icons/check-circle-complete.png';
import CheckCompleteFalse from '../../materials/icons/check-circle.png';

import '../../stylesheets/projectUI.css';

const TaskCard = props => {
    const { id_task }= useParams();
    
    const CheckComplete = {CheckCompleteTrue, CheckCompleteFalse}
    const [relevant, setRelevant] = useState(CheckComplete.CheckCompleteFalse)
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null)

    const tasksRef = useRef();
    const taskRef = useRef();
    tasksRef.current = tasks ;
    taskRef.current = task ;


    useEffect(() => {
        retrieveTasks();
    }, []);

            const retrieveTasks  = async() => {
                const responce = await TaskService.findAll()
                setTasks(responce.data);
            };

            const updateRelevant =(status)=>{
                var data = {
                    id_task: id_task,
                    relevant: status
                }
                TaskService.update(id_task, data)
                .then( responce=>{
                    setTask({...task, relevant: status});
                    console.log(responce.data);
                })
                .catch(e=>{
                    console.log(e);
                });
                setRelevant(CheckComplete.CheckCompleteTrue);
            };

            const deleteTask = async () => {
                await TaskService.remove(id_task);
            };

            return(
                <>
                { tasks.map((task, id_task) =>(
                    <div className='task' >
                        <div className='card' key={id_task}>
                            <div className='title'>
                                <button className='button-add' onClick={()=> {updateRelevant(false)} }>
                                    <img src={relevant} alt='button-add' />
                                </button>

                                <button onClick={deleteTask} className='button-delete'>
                                    <img src={Delete} alt='button-delete' />
                                </button>
                                
                                <h5>{task.title}</h5>
                            </div>
                            <div className="text-muted">
                                <h6>{`Начало: `+ new Date(task.date_start).toLocaleString() }</h6>
                                <h6>{`Конец: `+ new Date(task.date_end).toLocaleString() }</h6>
                            </div>
                        </div>
                    </div>
                ))}
                </>
            );
};

export default TaskCard