import React, { useEffect } from "react";
import Project from "./project";
import { useSelector, useDispatch } from "react-redux";
import { GetFinishedProject } from "../../../action/project";
import "./Finished.scss";

const FinishedProjects = props => {
    const dispatch = useDispatch();
    const getProject = filter => dispatch(GetFinishedProject(filter));
    let roles = useSelector(state => state.auth.data.roles);
    let projects = useSelector(state => state.project.data);
    let count = useSelector(state => state.project.count);
    let isAdmin = roles.includes("Admin");

    useEffect(() => {
        getProject({});
    }, []);

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
            <p className="Count">{count} projects</p>
            <div className="Contentt">
                {projects.map(p => (
                    <Project key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
};

export default FinishedProjects;
