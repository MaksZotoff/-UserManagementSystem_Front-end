import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BriefService from '../../services/brief.service';

import AddBriefForm from '../form/add-brief';
import BriefTable from '../table/brief-table';

import { useTable } from "react-table";
import '../../stylesheets/projectUI.css';

const BriefBoard = () => {

    return(
        <div className='brieflist'>
            <AddBriefForm/>

            <BriefTable/>
        </div>
        
    );

}

export default BriefBoard;