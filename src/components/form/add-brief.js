import React, { useState } from "react";
import BriefDataService from "../services/BriefService";
const AddBriefForm = () => {
    const initialBriefState = {
        id_brief: null,
        title: "",
        description: "",
        status: 00
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
        description: brief.description
        };
        BriefDataService.create(data)
        .then(response => {
            setBrief({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published
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
        // ...
    );
};
export default AddBriefForm;