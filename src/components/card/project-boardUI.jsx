/*
import React from 'react';
import { Link } from 'react-router-dom';

import Trash from '../../materials/icons/trash.png';
import Add from '../../materials/icons/add-black.png';

import '../../stylesheets/projectUI.css';
import TaskCard from './task-cardUI';

const ProjectBoardUI = (props) => {
    
    return(
        <>
            <div className='head'>
                <h5>{props.title}</h5>

                <div className='icon'>
                    <button  onClick={props.linkDEL} className='button-delete'>
                        <img src={Trash} alt='del' />
                    </button>

                    <Link to={props.linkADD} className='button-add'>
                        <img src={Add} alt='add' />
                    </Link>
                </div>

            </div>

            <div className='task'>
                <TaskCard />
            </div>
        </>
    );
}

export default ProjectBoardUI
*/

import React from 'react';
import { Link } from 'react-router-dom';

import Trash from '../../materials/icons/trash.png';
import Add from '../../materials/icons/add-black.png';

import '../../stylesheets/projectUI.css';
import TaskCard from './task-cardUI';

const ProjectBoardUI = (props) => {
    
    return(
        <>
            <div className='head'>
                <h5>{props.title}</h5>

                <div className='icon'>
                    <button  onClick={props.linkDEL} className='button-delete'>
                        <img src={Trash} alt='del' />
                    </button>

                    <Link to={props.linkADD} className='button-add'>
                        <img src={Add} alt='add' />
                    </Link>
                </div>

            </div>

            <div className='task'>
                <TaskCard />
            </div>
        </>
    );
}

export default ProjectBoardUI
