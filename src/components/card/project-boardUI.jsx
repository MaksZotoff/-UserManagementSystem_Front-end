import React from 'react';
import { Link } from 'react-router-dom';

import ProjectCardUI from './project-cardUI';
import Trash from '../../materials/icons/trash.png';
import Add from '../../materials/icons/icon-add.png';

import '../../stylesheets/projectUI.css';

const ProjectBoardUI = props => {
    
    return(
        <div className='col-md-3 chapter'>
            <div className='head'>
                <h5>{props.title}</h5>

                <div className='icon'>
                    <button className='button-delete' onClick={props.linkDEL}>
                        <img src={Trash} alt='del' />
                    </button>

                    <Link to={props.linkADD} className='button-add'>
                        <img src={Add} alt='add' />
                    </Link>
                </div>

            </div>

            <div className='col-body'>
                <ProjectCardUI title={props.cardTitle}/>
            </div>
        </div>
    );
}

export default ProjectBoardUI