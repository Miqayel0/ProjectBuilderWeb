import React from "react";
import { formatDate } from "../../../../utils/Helper";
import "./Project.scss";

const ongoingProject = props => {
    return (
        <div className="Project">
            <div className="Location">
                <span>{props.location}</span>
            </div>
            <div className="Title">
                <span>{props.name}</span>
            </div>
            <div className="description">
                <span>{props.description}</span>
            </div>
            <div className="Date">
                <div>
                    <p>{"Published"}</p>
                    <span>{formatDate(props.startDate)}</span>
                </div>
                <div style={{marginLeft: "80px"}}>
                    <p>{"Finished"}</p>
                    <span>{formatDate(props.endDate)}</span>
                </div>
            </div>
            <div className="Amount">
                <div className="Line" />
                <span>{`${props.amountRisedPercent} Rised of $${
                    props.amount
                } target`}</span>
            </div>

            <div className="Sponsors">
                <hr />
                <span>{`${props.sponsorsCount} sponsors`}</span>
            </div>
        </div>
    );
};

export default ongoingProject;
