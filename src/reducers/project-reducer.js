export const PROJECT_SUCCESS = "PROJECT_SUCCESS";
export const PROJECT_DETAILS_SUCCESS = "PROJECT_DETAILS_SUCCESS";
export const PROJECT_ERROR = "PROJECT_ERROR";
export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";

const initStore = {
    loading: false,
    data: [],
    project: null,
    count: 0,
    error: ""
};

const ProjectReducer = (store = initStore, action) => {
    switch (action.type) {
        case PROJECT_SUCCESS:
            return {
                ...store,
                data: action.playload.projects,
                count: action.playload.count
            };
        case PROJECT_DETAILS_SUCCESS:
            return {
                ...store,
                project: action.playload,
                count: 1
            };
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...store,
                project: action.playload
            };
        case PROJECT_ERROR:
            return { ...store, error: action.playload };
        case LOADING_START:
            return { ...store, loading: !store.loading };
        case LOADING_END:
            return { ...store, loading: !store.loading };
        case CREATE_PROJECT_SUCCESS:
            return { ...store };
        default:
            return store;
    }
};
export default ProjectReducer;
