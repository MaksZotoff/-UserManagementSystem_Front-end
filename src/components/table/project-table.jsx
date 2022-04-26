import React, { useState, useEffect } from 'react';
import ProjectService from '../../services/project.service';
import '../../stylesheets/cardUI.css';
import Table from 'react-bootstrap/Table'

const ProjectTable = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        retrieveProjects();
    }, []);

    const retrieveProjects = async () => {
        const responce = await ProjectService.findAll()
        setProjects(responce.data);
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
                        {projects.map((projects) =>
                            <tr key={projects.id_project}>
                                <td>{projects.title}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>

    );
}

export default ProjectTable