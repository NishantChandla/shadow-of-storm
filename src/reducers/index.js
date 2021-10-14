import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
    blacklist: ['gameSocket']
};

const socketReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_SOCKET":
            return action.payload;
        case "DELETE_SOCKET":
            return {};
        default:
            return state;
    }
}

const reducers = combineReducers({gameSocket:socketReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;