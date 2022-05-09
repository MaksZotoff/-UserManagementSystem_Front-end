
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProjectService from '../../services/project.service';
import ProjectBoardUI from '../card/project-boardUI';

import Plus from '../../materials/icons/plus.png';
import '../../stylesheets/projectUI.css';

const ProjectBoard = () => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveProjects();
    }, []);

    const retrieveProjects = async () => {
        const responce = await ProjectService.findAll()
        setProjects(responce.data);
    };

    const setActiveProject = (project, index) => {
        setCurrentProject(project);
        setCurrentIndex(index);
    };

    const deleteProject = (project, index) => {
        ProjectService.remove(currentProject.id_project)
            .then(response => {
            console.log(response.data);
            retrieveProjects();
        })
        .catch(e => {
            console.log(e);
        });
    };


    return (
        <>
            <div className='projectlist'>
                { projects.map((project, index) => ( 
                    <div 
                        className={
                            'col-md-3 chapter' + (index === currentIndex ? '-active': '' )
                        }
                        onClick={()=> setActiveProject(project, index) }
                        key={index}
                    >
                        <ProjectBoardUI 
                            title={project.title}
                            linkDEL={deleteProject}
                            linkADD={`/addtask`}
                        />
                    </div>
                ))}
            </div>

            <div className='col-md-3 chapter'>
                <div className='head'>
                    <Link to="/addproject" className='icon'>
                        <img src={Plus} alt='button-add' />
                        <h5>Добавить раздел</h5>
                    </Link>
                </div>
            </div>

        </>
    );
};
export default ProjectBoard
