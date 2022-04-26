
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/project.service';

import ProjecBoardUI from '../card/project-boardUI';
import ProjectCard from '../card/project-cardUI';

import Plus from '../../materials/icons/plus.png';

import '../../stylesheets/projectUI.css';

const ProjectBoard = (props) => {
    const [projects, setProjects] = useState([]);

    const projectsRef = useRef();
    projectsRef.current = projects;

    useEffect(() => {
        retrieveProjects();
    }, []);

    const retrieveProjects = async () => {
        const responce = await ProjectService.findAll()
        setProjects(responce.data);
    };

    return (
        <>
            <div className='projectlist'>
                {projects.map((project, id_project) => {

                    const deleteProject = async () => {
                        await ProjectService.remove(project.id_project);
                        retrieveProjects();
                    };

                    return (
                        <div className='col-md-3 chapter' key={id_project}>
                            <ProjecBoardUI
                                title={project.title}
                                linkDEL={deleteProject}
                                linkADD={`/addtask`}
                            />

                        </div>

                    );
                })}

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

