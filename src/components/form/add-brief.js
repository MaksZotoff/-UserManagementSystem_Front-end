import React, { useState } from "react";
import BriefService from "../../services/brief.service";

import '../../stylesheets/cardUI.css';

const AddBriefForm = () => {

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


    return (
        <div className="submitform">
            {submitted ? (
                <div className="col-md-8">
                    <h5>Задача добавлена, добавить еще?</h5>
                    <button className="btn btn-outline-success" onClick={newBrief}>
                        Добавить
                    </button>
                </div>
            ) : (
                <div className="col-md-8">
                    <div className="form-group">
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
                    </div>

                    <button onClick={saveBrief} className="btn btn-outline-success">
                        Добавить
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddBriefForm;