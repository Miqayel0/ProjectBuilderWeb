import React from "react";
import Icon from "../../../assets/img/project-details.png";
import "./Details.scss";

const projectDetails = props => {
    return (
        <div className="Details">
            <div className="Image">
                <img src={Icon} alt="project image" />
            </div>
            <div className="Location">Yerevan, Armenia</div>
            <div className="Title">Gyumri Hospital Reconstruction</div>
            <div className="Status" />
            <div className="Status2" />
            <div className="Status3" />
            <div className="Donate">
                <div className="Goal">Goal</div>
                <div className="Amount">$ 1150000‬</div>
            </div>
        </div>
    );
};

export default projectDetails;
