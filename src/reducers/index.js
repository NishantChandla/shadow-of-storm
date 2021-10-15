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


const selectedCardsReducer = (state=[], action) => {
    switch(action.type){
        case "SET_SELECTED_CARDS":
            return action.payload;
        default:
            return state;
    }
}

const strategyReducer = (state=[], action) => {
    switch(action.type){
        case "SET_STRATEGY":
            return action.payload;
        default:
            return state;
    }
}

const myTilesReducer = (state=[], action) => {
    switch(action.type){
        case "SET_MY_TILES":
            return action.payload;
        case "SET_ONE_TILE":
            return state.map((e, idx)=>{
                if(action.payload.id===idx){
                    return action.payload.type;
                }else{
                    return e;
                }
            })
        default:
            return state;
    }
}

const enemyReducer = (state=[], action) => {
    switch(action.type){
        case "SET_ENEMY_TILES":
            return action.payload;
        case "SET_ONE_ENEMY_TILE":
            return state.map((e, idx)=>{
                if(action.payload.id===idx){
                    return action.payload.type;
                }else{
                    return e;
                }
            })
        default:
            return state;
    }
}

const reducers = combineReducers({gameSocket:socketReducer, marketplaceData: marketplaceReducer, userCards: userCardsReducer, allCards: allCardsReducer, selectedCards: selectedCardsReducer, strategy: strategyReducer, myTiles: myTilesReducer, enemyTiles: enemyReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;