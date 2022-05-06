import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import TaskService from '../../services/project.service';
import Table from 'react-bootstrap/Table'
import '../../stylesheets/cardUI.css';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        retrieveTasks();
    }, []);

    const retrieveTasks = async () => {
        const responce = await TaskService.findAll()
        setTasks(responce.data);
    };


    return (
        <>
            <div className='projecttable'>
                <h3>Проекты</h3>
                <Table striped bordered hover responsive>
                    
                    <thead >
                        <tr >
                            <th >Название</th>
                        </tr>
                    </thead>
                    <tbody >
                        {tasks.map((tasks) =>
                            <tr key={tasks.id_project}>
                                <td>{tasks.title}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className='form-group buttons'>
                        <button id='projectbuttons' className='btn btn-outline-secondary'>Завершено</button>
                        <button id='projectbuttons' className='btn btn-outline-secondary'>Актуально</button>
    
                    </div>
            </div>
        </>

    );
}

export default TaskTable