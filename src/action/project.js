import {
    ONGOING_PROJECT_SUCCESS,
    FINISHED_PROJECT_SUCCESS,
    PROJECT_ERROR,
    CREATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    PROJECT_DETAILS_SUCCESS,
    LOADING_START,
    LOADING_END
} from "../reducers/project-reducer";

import Axios from "../Axios";

function FinishedProjectSuccess(data) {
    return {
        type: FINISHED_PROJECT_SUCCESS,
        playload: data
    };
}

function OngoingProjectSuccess(data) {
    return {
        type: ONGOING_PROJECT_SUCCESS,
        playload: data
    };
}

function ProjectDetailsSuccess(data) {
    return {
        type: PROJECT_DETAILS_SUCCESS,
        playload: data
    };
}

function UpdateProjectSuccess(data) {
    return {
        type: UPDATE_PROJECT_SUCCESS,
        playload: data
    };
}

function CreateProjectSuccess(data) {
    return {
        type: CREATE_PROJECT_SUCCESS,
        playload: data
    };
}

function ProjectError(error) {
    return {
        type: PROJECT_ERROR,
        playload: error
    };
}

function Loading(bool) {
    return {
        type: bool ? LOADING_START : LOADING_END,
        playload: null
    };
}

export function CreateProject(formData) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.post("/project", formData, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(CreateProjectSuccess(data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(ProjectError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(ProjectError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}

export function GetProjectDetails(id) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.get(`/project/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(ProjectDetailsSuccess(data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(ProjectError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(ProjectError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}

export function UpdateProject(id, body) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.put(`/project/${id}`, body, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(UpdateProjectSuccess(data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(ProjectError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(ProjectError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}

export function GetFinishedProject(filter) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.get("/project/finished", {
                params: filter,
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(FinishedProjectSuccess(data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(ProjectError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(ProjectError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}

export function GetOngoingProject(filter) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.get("/project/ongoing", {
                params: filter,
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(OngoingProjectSuccess(data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(ProjectError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(ProjectError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}
