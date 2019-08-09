import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOADING_START,
    LOADING_END,
} from "../reducers/account-reducer";

import Axios from "../Axios";

function RegisterSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        playload: data
    };
}

function RegisterError(error) {
    return {
        type: REGISTER_ERROR,
        playload: error
    };
}

function Loading(bool) {
    return {
        type: bool ? LOADING_START : LOADING_END,
        playload: null
    };
}
export function Register(formData) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.post("/auth", formData, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
            dispatch(RegisterSuccess(data.data.data));
            localStorage.setItem("accessToken", data.data.data.accessToken);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors);
                dispatch(RegisterError(error.response.data.errors));
            } else {
                alert(error.message);
                dispatch(RegisterError(error.message));
            }
        } finally {
            dispatch(Loading(false));
        }
    };
}

