import React from 'react';
import '../../stylesheets/projectUI.css';
import CheckComplete from '../../materials/icons/check-circle-complete.png';

const ProjectCardUI = props => {
    
    return(
            <div className='task'>
                <div className='card'>
                    <div className='title'>
                        <img src={CheckComplete} alt='button-add' />
                        <h5>{props.title}</h5>
                    </div>
                    <div class="text-muted">
                        <h6>2 days ago</h6>
                        <h6>2 days ago</h6>
                    </div>
                    
                </div>
            </div>
    );
}

export default ProjectCardUI



