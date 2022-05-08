import React, { useState, useEffect } from 'react';

import AdminService from '../../services/admin.service';
import TaskService from '../../services/task.service';
import ProjectService from '../../services/project.service';

import InformCardUI from '../card/inform-cardUI';
import UserTable from '../table/user-table';
import ProjectTable from '../table/project-table';
import UserChart from '../chart/user-chart';

import '../../stylesheets/cardUI.css';

const BoardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState(0);
    const [projects, setProjects] = useState(0);

    useEffect(() => {
        retrieveUsers();
        retrieveTasks();
        retrieveProjects();
    }, []);

    const retrieveUsers = async () => {
        const responce = await AdminService.findAll()
        setUsers(responce.data);
    };
    const retrieveTasks = async () => {
        const responce = await TaskService.findAll()
        setTasks(responce.data);
    };
    const retrieveProjects = async () => {
        const responce = await ProjectService.findAll()
        setProjects(responce.data);
    };


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-4'>
                        <InformCardUI link='/user' count={users.length} title='сотрудников' />
                    </div>
                    <div className='col-md-4'>
                        <InformCardUI link='/task' count={tasks.length} title='задач' />
                    </div>
                    <div className='col-md-4'>
                        <InformCardUI link='/project' count={projects.length} title='проектов' />
                    </div>
                </div>
            </div>

            <div className='container d-flex'>
                <UserTable/>
                <ProjectTable/>
            </div>
            <UserChart/>
        </>
    );
};

export default BoardAdmin
