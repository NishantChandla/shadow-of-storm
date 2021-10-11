import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
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

const reducers = combineReducers({walletConfig: connectWalletReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;