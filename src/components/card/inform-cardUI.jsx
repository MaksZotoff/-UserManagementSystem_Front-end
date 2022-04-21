import React from 'react';
import '../../stylesheets/cardUI.css';

const InformCardUI = props => {
    return (
        <a className='card-link' href={props.link}>
            <div className='card text-center shadow'>
                <div className='card-body text-dark'>
                    <div className='card-title'>
                        <h3>{props.count}</h3>
                        <h6>{props.title}</h6>
                    </div>
                </div>
            </div>
        </a>
    )
}
export default InformCardUI
