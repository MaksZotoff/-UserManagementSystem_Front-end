import React from 'react';

import AddBriefForm from '../forms/add-brief';

import '../../stylesheets/projectUI.css';

const BriefBoard = () => {

    return (
<div className=' main container-fluid'>
        <div className='brieflist'>
            <AddBriefForm />
        </div>
</div>

    );

}

export default BriefBoard;