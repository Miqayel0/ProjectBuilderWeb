import { combineReducers } from "redux";
import AuthReducer from "./auth-reducer";
import AccountReducer from "./account-reducer";

export default combineReducers({
    auth: AuthReducer,
    account: AccountReducer
});
