import React from 'react';
import '../../stylesheets/cardUI.css';
import "bootstrap/dist/css/bootstrap.min.css";

const AdminCardUI = props => {
    return(
        <div className="card text-center shadow">
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <a href={props.link} className='btn btn-outline-success'>Посмотреть</a>
            </div>
        </div>
    );
}
export default AdminCardUI
