import axios from 'axios';

export const fetchMarketplace = () => {
    return async (dispatch, getState) => {
        const res = await axios.get("https://sos-solana.herokuapp.com/allcards")
        console.log(res.data?.result);
        dispatch({type:"SET_ALL_CARDS", payload: res.data?.result});
        const marketplaceCards = res.data?.result.filter((obj)=>obj.is_for_sale);
        dispatch({type:"SET_MARKETPLACE_CARDS", payload: marketplaceCards});
    }
}

export const fetchUserCards = ({address}) => {
    return async (dispatch, getState) => {
        await dispatch(fetchMarketplace());
        const { allCards } = getState();
        console.log(allCards);
        const userCards = allCards.filter((obj)=>obj.owner===address);
        dispatch({type:"SET_USER_CARDS", payload: userCards});
    } 
}