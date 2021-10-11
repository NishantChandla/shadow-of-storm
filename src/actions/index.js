
export const connectWallet = () => {
    return async ()=>{

    }
}

export const _walletConfig = (user) => {
    return {
        type:"CONNECT_WALLET",
        user,
    }
}

export const disconnectWallet = () => {
    return async () => {
    }
}