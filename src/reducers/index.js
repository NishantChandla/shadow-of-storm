import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
    blacklist: ['socketReducer']
};


const initialWalletState = {
    user: {
        userAddress : "",
        userBalance : 0,
    },
}

const connectWalletReducer = (config = initialWalletState, action) => {
    switch(action.type){
        case "CONNECT_WALLET":
            return {...config,user: action.user, 
                        };
        case "DISCONNECT_WALLET":
            storage.removeItem('persist:root')
            return {...initialWalletState,
                    };
        case "CONNECT_WALLET_ERROR":
            return config;
        default:
            return config;
    }
}

const socketReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_SOCKET":
            return action.payload;
        default:
            return state;
    }
}

const reducers = combineReducers({socketReducer:socketReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;