import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};

const reducers = combineReducers({});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;