import React from "react";
import { formatDate } from "../../../../utils/Helper";
import "./Project.scss";

const finishedProject = props => {
    console.log("props",props);
    return (
        <div className="ProjectFinished">
            <div className="Location">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.728"
                    height="17.572"
                    viewBox="0 0 12.728 17.572"
                >
                    <defs />
                    <g transform="translate(0 0)">
                        <g transform="translate(0)">
                            <path
                                class="a"
                                d="M76.937,0a6.371,6.371,0,0,0-6.364,6.364c0,4.355,5.7,10.748,5.938,11.018a.573.573,0,0,0,.853,0c.242-.27,5.938-6.663,5.938-11.018A6.371,6.371,0,0,0,76.937,0Zm0,9.566a3.2,3.2,0,1,1,3.2-3.2A3.206,3.206,0,0,1,76.937,9.566Z"
                                transform="translate(-70.573)"
                            />
                        </g>
                    </g>
                </svg>
                <span>{props.location}</span>
            </div>
            <div className="Title">
                <span>{props.name}</span>
            </div>
            <div className="Description">
                <p>{props.description}</p>
            </div>
            <div className="Date">
                <div>
                    <p>{"Published"}</p>
                    <span>{formatDate(props.startDate)}</span>
                </div>
                <div style={{ marginLeft: "80px" }}>
                    <p>{"Finished"}</p>
                    <span>{formatDate(props.endDate)}</span>
                </div>
            </div>
            <div className="Amount">
                <div>
                    <div className="Line" />
                    <div className="Line2" />
                </div>
                <div className="Span">
                    {" "}
                    <span>{`${props.amountRisedPercent} Rised of $${
                        props.amount
                    } target`}</span>{" "}
                </div>
            </div>

            <div className="Sponsors">
                <hr />
                <span>{`${props.sponsorsCount} sponsors`}</span>
            </div>
        </div>
    );
};

export default finishedProject;
