import React from 'react';

import AddBriefForm from '../form/add-brief';
import BriefTable from '../table/brief-table';

import '../../stylesheets/projectUI.css';

const BriefBoard = () => {

    return (
        <div className='brieflist'>
            <AddBriefForm />

            <BriefTable />
        </div>

    );

}

export default BriefBoard;