import React from 'react';
import { Link } from 'react-router-dom';

import '../../stylesheets/cardUI.css';

const UserCardUI = props => {
    return (
        <div className='card text-center shadow'>
        <Link className='card-link' to={props.link}>

            <div className='card-body text-dark'>
            
            <h6 className='card-title'> {props.name} {props.surname} ({props.username})</h6>
                <ul>                
                    <li>Почта: {props.email}</li>
                    <li>Телефон: {props.phone}</li>
                    <li>З/П: {props.salary}</li>
                </ul>
                <div className='buttons'>
                    <Link to={props.linkUPD} className='btn btn-outline-info'>Изменить</Link>
                    <button className='btn btn-outline-danger' onClick={props.linkDEL}>Удалить</button>
                </div>
            </div>
        </Link>
        </div>

    );
}

export default UserCardUI