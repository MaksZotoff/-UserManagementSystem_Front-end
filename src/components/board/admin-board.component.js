import React from "react";
import AdminCardUI from "../card/admin-cardUI";
import "../../stylesheets/cardUI.css";

const BoardAdmin = () => {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-4">
            <AdminCardUI link="/home" title="Проекты" />
            </div>

            <div className="col-md-4">
            <AdminCardUI link="/user" title="Сотрудники" />
            </div>

            <div className="col-md-4">
            <AdminCardUI link="/order" title="Задачи" />
            </div>
        </div>
        </div>
    );
};

export default BoardAdmin;
