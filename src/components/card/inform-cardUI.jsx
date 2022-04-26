import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/cardUI.css';

const InformCardUI = props => {
    return (
        <Link className='card-link' to={props.link}>
            <div className='card text-center shadow'>
                <div className='card-body text-dark'>
                    <div className='card-title'>
                        <h3>{props.count}</h3>
                        <h6>{props.title}</h6>
                    </div>                

                </div>
            </div>
        </Link>
    )
}
export default InformCardUI
