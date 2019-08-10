export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';


const initStore = {
    loading: false,
    data: {},
    isSignIn: false, // change for local work
    error: "",
}
const AuthReducer = (store = initStore, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return { ...store, isSignIn: true, data: action.playload };
        case SIGNIN_ERROR:
            return { ...store, isSignIn: false, error: action.playload };
        case LOADING_START:
            return { ...store, loading: !store.loading };
        case LOADING_END:
            return { ...store, loading: !store.loading}
        case SIGNOUT_SUCCESS:
            return {...store, isSignIn: false, data: action.playload };
        default:
            return store;
    }
}
export default AuthReducer;