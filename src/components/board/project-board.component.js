
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/project.service';

import ProjectBoardUI from '../card/project-boardUI';

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
                        <div className='col-md-3 chapter'>
                            <ProjectBoardUI
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


/*
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../../services/task.service";
import '../../stylesheets/projectUI.css';

const ProjectBoardUI = (props) => {
    const { id_task }= useParams();
    let navigate = useNavigate();

    const initialTaskState = {
        id_task: null,
        title: '',
        date_start: '',
        date_end: '',
        relevant: true
      };
      const [currentTask, setCurrentTask] = useState(initialTaskState);
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
        TaskService.update(currentTask.id_task, data).then(response => {
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
            setMessage("The tutorial was updated successfully!");
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
                <div className="edit-form">
                <h4>Задача</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Название</label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={currentTask.title}
                        onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="date_start">Дата начала</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date_start"
                            name="date_start"
                            value={currentTask.date_start}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_end">Дата окончания</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date_end"
                            name="date_end"
                            value={currentTask.date_end}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <strong>Status:</strong>
                        </label>
                        {currentTask.relevant ? true : false}
                    </div>
                </form>

                {currentTask.relevant ? (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => updateRelevant(false)}
                    >
                    Выполнено
                    </button>
                ) : (
                    <button
                    className="badge badge-primary mr-2"
                    onClick={() => updateRelevant(true)}
                    >
                    Исполняется
                    </button>
                )}

                <button className="badge badge-danger mr-2" onClick={deleteTask}>
                    Удалить
                </button>

                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateTask}
                >
                    Обновить
                </button>
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
}

export default ProjectBoardUI
*/