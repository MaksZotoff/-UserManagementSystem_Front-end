import React from 'react';
import '../../stylesheets/cardUI.css';

const MainCardUI = props => {
    return(
        <div className='card text-center shadow'>
            <div className='card-body text-dark'>
                <h4 className='card-title'>{props.title}</h4>
                <a href={props.link} className='btn btn-outline-success'>Посмотреть</a>
            </div>
        </div>
    );
}
export default MainCardUI