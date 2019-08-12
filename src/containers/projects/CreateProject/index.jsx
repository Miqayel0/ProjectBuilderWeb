import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { CreateProject } from "../../../action/project";
import "./Create.scss";

const CreateProjects = props => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [initiator, setInitiator] = useState("");
    const [amount, setAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [files, setFiles] = useState("");

    let roles = useSelector(state => state.auth.data.roles);
    let isAdmin = roles.includes("Admin");
    let inputFileElement = null;
    let render = <h2>Permission Denied</h2>;

    const inputChangedHandler = (event, callBack) => {
        callBack(event.target.value);
    };

    const uploadImgHnadler = event => {
        setFiles(event.target.files[0]);
    };

    const submitHandler = event => {
        let formData = new FormData();
        formData.append("location", location);
        formData.append("name", title);
        formData.append("description", description);
        formData.append("initiatorName", initiator);
        formData.append("amount", amount);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("files", files);

        dispatch(CreateProject(formData));
    };

    if (isAdmin)
        render = (
            <div className="Create">
                <div className="Top">
                    <div className="PrDesc">
                        <p onClick={() => props.history.goBack()}>
                            {" <-- Create Projects"}
                        </p>
                    </div>
                    <div className="Content">
                        <div className="Image">
                            <input
                                type="file"
                                ref={input => (inputFileElement = input)}
                                onChange={uploadImgHnadler}
                                style={{ display: "none" }}
                            />
                            <svg
                                onClick={() => inputFileElement.click()}
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="133.781"
                                height="133.781"
                                viewBox="0 0 133.781 133.781"
                            >
                                <defs>
                                    <filter
                                        id="a"
                                        x="0"
                                        y="0"
                                        width="133.781"
                                        height="133.781"
                                        filterUnits="userSpaceOnUse"
                                    >
                                        <feOffset dy="3" input="SourceAlpha" />
                                        <feGaussianBlur
                                            stdDeviation="3"
                                            result="b"
                                        />
                                        <feFlood floodOpacity="0.161" />
                                        <feComposite operator="in" in2="b" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g transform="translate(9 6)">
                                    <g
                                        className="c"
                                        transform="matrix(1, 0, 0, 1, -9, -6)"
                                    >
                                        <circle
                                            className="a"
                                            cx="57.891"
                                            cy="57.891"
                                            r="57.891"
                                            transform="translate(9 6)"
                                        />
                                    </g>
                                    <line
                                        className="b"
                                        x2="62.213"
                                        transform="translate(26.784 60.176)"
                                    />
                                    <line
                                        className="b"
                                        y2="65.872"
                                        transform="translate(58.501 27.24)"
                                    />
                                </g>
                            </svg>
                            <p style={{ fontSize: "24px", color: "#5E5E5E" }}>
                                Upload cover image for project
                            </p>
                            <p style={{ fontSize: "16px", color: "#5E5E5E" }}>
                                Try to upload image with as much as possible
                                good quality
                            </p>
                        </div>
                        <div className="Input">
                            <div className="Cont">
                                <div className="Tile">
                                    <p>Project Description</p>
                                </div>
                                <div className="TextInput">
                                    <span>Location</span>
                                    <input
                                        type="text"
                                        placeholder="Set project place location"
                                        onChange={event =>
                                            inputChangedHandler(
                                                event,
                                                setLocation
                                            )
                                        }
                                    />
                                    <span>Project Title</span>
                                    <input
                                        type="text"
                                        placeholder="Write title"
                                        onChange={event =>
                                            inputChangedHandler(event, setTitle)
                                        }
                                    />
                                    <span>Project Initiator</span>
                                    <input
                                        type="text"
                                        placeholder="Write initiator"
                                        onChange={event =>
                                            inputChangedHandler(
                                                event,
                                                setInitiator
                                            )
                                        }
                                    />
                                    <span>Project Amount</span>
                                    <input
                                        type="text"
                                        placeholder="Set amount"
                                        onChange={event =>
                                            inputChangedHandler(
                                                event,
                                                setAmount
                                            )
                                        }
                                    />
                                </div>
                                <span>Project Description</span>
                                <textarea
                                    rows="17"
                                    placeholder="Write description"
                                    onChange={event =>
                                        inputChangedHandler(
                                            event,
                                            setDescription
                                        )
                                    }
                                />
                                <p>Dates</p>
                                <span>
                                    This project will be visible to your users
                                    from the date you select
                                </span>
                                <div className="Dates">
                                    <div>
                                        <span>Start date</span>
                                        <input
                                            type="date"
                                            onChange={event =>
                                                inputChangedHandler(
                                                    event,
                                                    setStartDate
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <span>End date</span>
                                        <input
                                            type="date"
                                            onChange={event =>
                                                inputChangedHandler(
                                                    event,
                                                    setEndDate
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    className="Button"
                                    onClick={submitHandler}
                                >
                                    SAVE AND PUBLISH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return render;
};

export default withRouter(CreateProjects);
