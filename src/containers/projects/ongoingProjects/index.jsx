import React, { useEffect } from "react";
import Project from "./project";
import { useSelector, useDispatch } from "react-redux";
import { GetOngoingProject } from "../../../action/project";
import { withRouter } from "react-router";
import "./Ongoing.scss";

const OngoingProjects = props => {
    const dispatch = useDispatch();
    const getProject = filter => dispatch(GetOngoingProject(filter));
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
                <span>Ongoing Projects</span>
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
                {projects.map(p => {
                    const { location, ...projectExceptLocation } = p;
                    return (
                        <Project
                            key={p.id}
                            {...projectExceptLocation}
                            Location={p.location}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default withRouter(OngoingProjects);
