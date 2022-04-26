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
        { tasks.map((task, id_project) =>{
            return(
            <div className='task' key={id_project}>
                <div className='card'>
                    <div className='title'>
                        <img src={CheckComplete} alt='button-add' />
                        <img src={Delete} alt='button-delete' />
                        
                        <h5>{task.title}</h5>
                    </div>
                    <div className="text-muted">
                        <h6>{task.date_start}</h6>
                        <h6>{task.date_end}</h6>
                    </div>
                    
                </div>
            </div>    
            )         
        })}
        </>
        
    );
}

export default ProjectCard



