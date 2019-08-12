import {
    PROJECT_SUCCESS,
    PROJECT_ERROR,
    CREATE_PROJECT_SUCCESS,
    LOADING_START,
    LOADING_END
} from "../reducers/project-reducer";

import Axios from "../Axios";

function ProjectSuccess(data) {
    return {
        type: PROJECT_SUCCESS,
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

export function GetProject(filter) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.get("/project", {
                params: filter,
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(ProjectSuccess(data.data));
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

export function UpdateProject(id, formData) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.put(`/project/${id}`, formData, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(ProjectSuccess(data.data.data));
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

export function GetProjectById(id) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.get(`/project/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(ProjectSuccess(data.data.data));
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
