import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProjectDetails, UpdateProject } from "../../../action/project";
import Icon from "../../../assets/img/project-details.png";
import "./Details.scss";

const ProjectDetails = props => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    let project = useSelector(state => state.project.project);
    const getProjectDetails = id => dispatch(GetProjectDetails(id));
    const donate = (id, data) => dispatch(UpdateProject(id, data));

    const donateClickedHandler = event => {
        if (amount !== 0) {
            donate(project.id, { amount: amount });
        }
    };

    const donateChangedHandler = event => {
        let { value } = event.target;

        if (isNaN(value) || value <= 0) {
            throw new Error("Invalid Amount");
        }

        setAmount(value);
    };

    useEffect(() => {
        getProjectDetails(props.match.params.id);
    }, []);

    let render = null;
    if (project)
        render = (
            <div className="Details">
                <div className="Head">
                    <div className="Image">
                        <img src={Icon} alt="project" />
                    </div>
                    <div className="Location">{project.location}</div>
                    <div className="Title">{project.name}</div>
                    <div className="Status" />
                    <div className="Status2" />
                    <div className="Status3" />
                    <div className="Donate">
                        <div className="Goal">Goal</div>
                        <div className="Amount">{`$ ${project.amount}`}‬</div>
                        <div className="Rised">{`$ ${
                            project.risedAmount
                        } raised`}</div>
                        <div className="Input">
                            <input
                                type="text"
                                name="donate"
                                placeholder="Donation amount"
                                onChange={donateChangedHandler}
                            />
                        </div>
                        <button
                            className="Button"
                            onClick={donateClickedHandler}
                        >
                            DONATE NOW
                        </button>
                        <div className="Help">
                            <p className="P1">Can help with anything else?</p>
                            <p className="P2">More about it</p>
                        </div>
                    </div>
                    <div className="Contentt">
                        <div className="Initiator">
                            <p>Project Intitator</p>
                            <span>{project.initiatorName}</span>
                        </div>
                        <div className="Descript">
                            <p>Description</p>
                            <span>{project.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        );

    return render;
};

export default ProjectDetails;
