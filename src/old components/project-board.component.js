
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ProjecBoardUI from '../card/project-boardUI';
import ProjectService from '../../services/project.service';
import TaskService from '../../services/task.service';

import Plus from '../../materials/icons/plus.png';

import '../../stylesheets/projectUI.css';

const ProjectBoard = (props) => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState(props);

    
    const projectsRef = useRef();
    projectsRef.current = projects ;

    const tasksRef = useRef();
    tasksRef.current = tasks ;


    useEffect(() => {
        retrieveProjects();
        retrieveTasks();
    }, []);

    const retrieveProjects  = async() => {
        const responce = await ProjectService.findAll()
        setProjects(responce.data);
    };
    const retrieveTasks  = async() => {
        const responce = await TaskService.findAll()
        setTasks(responce.data);
    };


    return (
        <>
        <div className='projectlist'>
            { projects && projects.map((project, id_project) =>{

                    const deleteProject = async() => {
                        await ProjectService.remove(project.id_project);
                        retrieveProjects();
                    };

                    return(
                        <ProjecBoardUI 
                            key={id_project} 
                            title={project.title} 
                            linkDEL={deleteProject}
                            linkADD={`/addtask`}
                        />
                    );
            })}            
            
        </div>



            <div className='col-md-3 chapter'>
                <div className='head'> 
                    <Link to="/addproject" className='icon'>
                        <img  src={Plus} alt='button-add' />
                        <h5>Добавить раздел</h5>
                    </Link>
                </div>
            </div>
        
    </>
    );
};
export default ProjectBoard
