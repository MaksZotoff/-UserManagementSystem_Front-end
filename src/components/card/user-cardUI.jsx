import React from 'react';
import { Link } from 'react-router-dom';

import '../../stylesheets/cardUI.css';

const UserCardUI = props => {
    return(
        <div className='card text-center shadow'>
            <div className='card-body text-dark'>
                <h4 className='card-title'>{props.name}</h4>
                <ul>
                    <li>email: {props.email}</li>
                    <li>login: {props.name}</li>
                    <li>phone: {props.phone}</li>
                </ul>
                <div className='buttons'>
                    <Link to={props.linkUPD} className='btn btn-outline-info'>Изменить</Link>
                    <button className='btn btn-outline-danger' onClick={ props.linkDEL}>Удалить</button> 
                </div>
            </div>
            
        </div>
    );
}

export default UserCardUI