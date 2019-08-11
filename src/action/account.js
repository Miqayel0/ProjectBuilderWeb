import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOADING_START,
    LOADING_END
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
export function Register(formData, history) {
    return async dispatch => {
        try {
            dispatch(Loading(true));
            const data = await Axios.post("/account", formData);
            history.push("/sign-in");
            dispatch(RegisterSuccess(data.data.data));
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
