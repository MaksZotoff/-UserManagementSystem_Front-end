import React, { useState, useEffect } from 'react';
import BriefService from '../../services/brief.service';
import '../../stylesheets/projectUI.css';

const BriefTable = () => {
    const [briefs, setBriefs] = useState([]);
    const [currentBrief, setCurrentBrief] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

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

    const setActiveBrief = (task, index) => {
        setCurrentBrief(task);
        setCurrentIndex(index);
    };

    const deleteBrief = () => {
        BriefService.remove(currentBrief.id_task)
            .then(response => {
                console.log(response.data);
                retrieveBriefs();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className='submitform'>
            <div className="col-md-8">
                <ul className="list-group">
                    {briefs &&
                        briefs.map((brief, index) => (
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

export default BriefTable;