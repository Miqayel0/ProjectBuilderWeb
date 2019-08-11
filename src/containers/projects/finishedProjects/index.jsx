import React from "react";
import Project from "./project";
import { useSelector } from "react-redux";
import "./Finished.scss";

const FinishedProjects = props => {
    let roles = useSelector(state => state.auth.data.roles);
    let isAdmin = roles.includes("Admin");

    return (
        <div className="Continer">
            <div className="Top">
                <span>Finished Projects</span>
                {isAdmin && (
                    <button
                        className="Button"
                        onClick={() => props.history.push("/create")}
                    >
                        CREATE NEW PROJECT
                    </button>
                )}
            </div>
            <Project />
        </div>
    );
};

export default FinishedProjects;
