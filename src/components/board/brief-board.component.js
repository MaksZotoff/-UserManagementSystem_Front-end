import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BriefService from '../../services/brief.service';
import { Link } from 'react-router-dom';

import '../../stylesheets/projectUI.css';

const BriefBoard = () => {
    const [briefs, setBriefs] = useState([]);

    const [currentBrief, setCurrentBrief] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    
    const { id_brief }= useParams();
    let navigate = useNavigate();

    useEffect(() => {
        retrieveBriefs();
    }, []);

    const retrieveBriefs = () => {
        BriefService.findAll()
        .then(response => {
            setBriefs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const setActiveBrief = (brief, index) => {
        setCurrentBrief(brief);
        setCurrentIndex(index);
    };

    const deleteBrief = () => {
        BriefService.remove(currentBrief.id_brief)
            .then(response => {
            console.log(response.data);
            navigate("/todo");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return(
        <div className="list row">

            <div className="col-md-8">
                <h4>Задачи на сегодня:</h4>
                <ul className="list-group">
                    {briefs.map((brief, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveBrief(brief, index)}
                                key={index}
                            >
                                {brief.title}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );

}

export default BriefBoard;