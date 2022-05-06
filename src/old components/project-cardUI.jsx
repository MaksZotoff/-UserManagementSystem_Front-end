/*
import React, { useState, useEffect, useRef } from 'react';

import TaskService from '../../services/task.service';
import Delete from '../../materials/icons/delete-black.png';
import CheckComplete from '../../materials/icons/check-circle.png';

import '../../stylesheets/projectUI.css';

const ProjectCard = props => {

    const [tasks, setTasks] = useState([]);
    const tasksRef = useRef();
    tasksRef.current = tasks ;

    useEffect(() => {
        retrieveTasks();
    }, []);

    const retrieveTasks  = async() => {
        const responce = await TaskService.findAll()
        setTasks(responce.data);
    };

    return(
        <>
        { tasks.map((task, id_task) =>{

            const updateRelevant = (status)=>{
                var data = {
                    id_task: task.id_task,
                    relevant: status
                }
                TaskService.update(task.id_task, data)
                .then( responce=>{
                    setTasks({...task, relevant: status});
                    console.log(responce.data);
                })
                .catch(e=>{
                    console.log(e);
                });
            };

            const deleteTask = async () => {
                await TaskService.remove(task.id_task);
                retrieveTasks();
            };
            return(

                <div className='task' key={id_task}>
                    <div className='card'>
                        <div className='title'>
                            <button 
                                className='button-add'
                                onClick={()=>updateRelevant(false)} 
                            >
                                {task.relevant? true : false}
                                <img src={CheckComplete} alt='button-add' />
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
            )         
        })}
        </>
        
    );
}

export default ProjectCard
*/