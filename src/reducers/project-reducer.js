export const PROJECT_SUCCESS = "PROJECT_SUCCESS";
export const PROJECT_ERROR = "PROJECT_ERROR";
export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

const initStore = {
    loading: false,
    data: {},
    error: ""
};
const ProjectReducer = (store = initStore, action) => {
    switch (action.type) {
        case PROJECT_SUCCESS:
            return { ...store, data: action.playload };
        case PROJECT_ERROR:
            return { ...store, error: action.playload };
        case LOADING_START:
            return { ...store, loading: !store.loading };
        case LOADING_END:
            return { ...store, loading: !store.loading };
        default:
            return store;
    }
};
export default ProjectReducer;
