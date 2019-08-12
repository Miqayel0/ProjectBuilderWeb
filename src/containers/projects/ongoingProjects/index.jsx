import React, { useEffect } from "react";
import Project from "./project";
import { useSelector, useDispatch } from "react-redux";
import { GetProject } from "../../../action/project";
import "./Ongoing.scss";

const OngoingProjects = props => {
    const dispatch = useDispatch();
    const getProject = filter => dispatch(GetProject(filter));
    let roles = useSelector(state => state.auth.data.roles);
    let projects = useSelector(state => state.project.data);
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
            <div className="Contentt">
                {projects.map(p => (
                    <Project key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
};

export default OngoingProjects;
