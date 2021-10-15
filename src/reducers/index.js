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

const marketplaceReducer = (state=[], action) => {
    switch(action.type){
        case "SET_MARKETPLACE_CARDS":
            return action.payload;
        default:
            return state;
    }
}

const allCardsReducer = (state=[], action) => {
    switch(action.type){
        case "SET_ALL_CARDS":
            return action.payload;
        default:
            return state;
    }
}

const userCardsReducer = (state=[], action) => {
    switch(action.type){
        case "SET_USER_CARDS":
            return action.payload;
        default:
            return state;
    }
}

const reducers = combineReducers({gameSocket:socketReducer, marketplaceData: marketplaceReducer, userCards: userCardsReducer, allCards: allCardsReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;