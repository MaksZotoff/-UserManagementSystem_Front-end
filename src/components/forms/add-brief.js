import React, { useState, useEffect } from "react";
import BriefService from "../../services/brief.service";

import '../../stylesheets/cardUI.css';

const AddBriefForm = () => {
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
    const initialBriefState = {
        id_brief: null,
        id_user:   null,
        title: "",
        status: false,
        createdAt: Date.now.toString,
    };        
    const [brief, setBrief] = useState(initialBriefState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBrief({ ...brief, [name]: value });
    };

    const saveBrief = () => {
        var data = {
        title: brief.title,
        id_user: brief.id_user,
        status: brief.status,
        createdAt: brief.createdAt
        };
        
        BriefService.addBrief(data)
        .then(response => {
            setBrief({
                id_brief: response.data.id_brief,
                id_user: response.data.id_user,
                title: response.data.title,
                status: response.data.status,
                createdAt: response.data.createdAt,
            });
            setSubmitted(true);
            retrieveBriefs();
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const newBrief = () => {
        setBrief(initialBriefState);
        setSubmitted(false);
    };

    
    const setActiveBrief = (brief, index) => {
        setCurrentBrief(brief);
        setCurrentIndex(index);
    };

    const deleteBrief = () => {
        BriefService.remove(currentBrief.id_brief)
            .then(response => {
                console.log(response.data);
                retrieveBriefs();
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <>
        <div className="submitformbrief">
        
            {submitted ? (
                <div className="col-md-8">
                    <h5>Задача добавлена, добавить еще?</h5>
                    <button className="btn btn-outline-success" onClick={newBrief}>
                        Добавить
                    </button>
                </div>
            ) : (
                <div className="col-md-8">
                    <div className="form-group-brief">
                        <label htmlFor="title">Название</label>
                        <input
                            type="text"
                            className="form-control"
                            id_brief="title"
                            required
                            value={brief.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                        <br/>
                    <button onClick={saveBrief} className="btn btn-outline-success">
                        Добавить
                    </button>                    
                    </div>


                </div>
            )}
            </div>
            <div className='submitform'>
            <div className="col-md-8">
                <ul className="list-group">
                    {briefs &&
                        briefs.map((brief, index) => (
                            <li
                                className={
                                    "list-group-brief " + (index === currentIndex ? "act" : "")
                                }
                                onClick={() => setActiveBrief(brief, index)}
                                key={index}
                            >
                                {brief.title}
                                {brief.createdAt}
                                <button className="btn btn-outline-danger" onClick={deleteBrief}>
                                    Удалить
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
            </div>
        </>
    );
};
export default AddBriefForm;