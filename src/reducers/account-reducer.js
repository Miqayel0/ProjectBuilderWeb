export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

const initStore = {
    loading: false,
    data: {},
    error: ""
};
const AccountReducer = (store = initStore, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...store, data: action.playload };
        case REGISTER_ERROR:
            return { ...store, error: action.playload };
        case LOADING_START:
            return { ...store, loading: !store.loading };
        case LOADING_END:
            return { ...store, loading: !store.loading };
        default:
            return store;
    }
};
export default AccountReducer;
