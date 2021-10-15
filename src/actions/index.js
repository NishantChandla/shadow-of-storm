import axios from 'axios';
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,

    TransactionInstruction,
    SYSVAR_RENT_PUBKEY
} from "@solana/web3.js";

const cluster = "https://api.devnet.solana.com";
const connection = new Connection(cluster, "confirmed");
var metadataProgram = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
var programAccount = new PublicKey("DHsQ1vHbagRA7ZKPvvqwGnYU6xK4rXA3BjwhACJLPkbr");

export const fetchMarketplace = () => {
    return async (dispatch, getState) => {
        const res = await axios.get("https://sos-solana.herokuapp.com/allcards")
        console.log(res.data?.result);
        dispatch({ type: "SET_ALL_CARDS", payload: res.data?.result });
        const marketplaceCards = res.data?.result.filter((obj) => obj.is_for_sale);
        dispatch({ type: "SET_MARKETPLACE_CARDS", payload: marketplaceCards });
    }
}

export const fetchUserCards = ({ address }) => {
    return async (dispatch, getState) => {
        await dispatch(fetchMarketplace());
        const { allCards } = getState();
        console.log(allCards);
        const userCards = allCards.filter((obj) => obj.owner === address);
        dispatch({ type: "SET_USER_CARDS", payload: userCards });
    }
}

export const buynftToken = (cardDetails, wallet) => {
    return async (dispatch, getState) => {

        try {
        if (wallet == undefined || wallet.publicKey == null) {
            alert('wallet not connected')
            return;
        }

        const SEED = makeid(6);
        let newAccountProgram = await PublicKey.createWithSeed(
            wallet.publicKey,
            SEED,
            programAccount
        );

        const pay_with = SystemProgram.createAccountWithSeed({
            fromPubkey: wallet.publicKey,
            basePubkey: wallet.publicKey,
            seed: SEED,
            newAccountPubkey: newAccountProgram,
            lamports: cardDetails.price,
            space: 1,
            programId: programAccount,
        });

        let pda_account = await PublicKey.findProgramAddress([new TextEncoder().encode(cardDetails.seed)], programAccount);


        console.log(cardDetails)
        const createInstruction = new TransactionInstruction({
            keys: [
                { pubkey: new PublicKey(cardDetails.id), isSigner: false, isWritable: true },
                { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
                { pubkey: newAccountProgram, isSigner: false, isWritable: false },
                { pubkey: new PublicKey(cardDetails.owned_account), isSigner: false, isWritable: true },
                { pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
                { pubkey: new PublicKey(cardDetails.owner), isSigner: false, isWritable: true },
                { pubkey: pda_account[0], isSigner: false, isWritable: false },
            ],
            programId: programAccount,
            data: [2],
        });

        const trans = await setPayerAndBlockhashTransaction(
            [pay_with, createInstruction], wallet
        );

        let signature = await wallet.sendTransaction(trans, connection);
        const result = await connection.confirmTransaction(signature);
        console.log("end sendMessage", result);
        dispatch(fetchMarketplace())
        dispatch(fetchUserCards({address:wallet.pubkey}))
        } catch (e) {
            alert(e);
        }
    }
}



export const sellnftToken = (cardDetails, wallet,price) => {
    return async (dispatch, getState) => {

        try {
        if (wallet == undefined || wallet.publicKey == null) {
            alert('wallet not connected')
            return;
        }

        const SEED = makeid(6);
        let newAccountProgram = await PublicKey.createWithSeed(
            wallet.publicKey,
            SEED,
            programAccount
        );
        // sellfor
        const pay_with = SystemProgram.createAccountWithSeed({
            fromPubkey: wallet.publicKey,
            basePubkey: wallet.publicKey,
            seed: SEED,
            newAccountPubkey: newAccountProgram,
            lamports: cardDetails.price,
            space: 1,
            programId: programAccount,
        });

        let pda_account = await PublicKey.findProgramAddress([new TextEncoder().encode(cardDetails.seed)], programAccount);


        console.log(cardDetails)
        const createInstruction = new TransactionInstruction({
            keys: [
                { pubkey: new PublicKey(cardDetails.id), isSigner: false, isWritable: true },
                { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
                { pubkey: newAccountProgram, isSigner: false, isWritable: false },
                { pubkey: new PublicKey(cardDetails.owned_account), isSigner: false, isWritable: true },
                { pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false },
                { pubkey: new PublicKey(cardDetails.owner), isSigner: false, isWritable: true },
                { pubkey: pda_account[0], isSigner: false, isWritable: false },
            ],
            programId: programAccount,
            data: [1],
        });

        const trans = await setPayerAndBlockhashTransaction(
            [pay_with, createInstruction], wallet
        );

        let signature = await wallet.sendTransaction(trans, connection);
        const result = await connection.confirmTransaction(signature);
        console.log("end sendMessage", result);
        dispatch(fetchMarketplace())
        dispatch(fetchUserCards({address:wallet.pubkey}))
        } catch (e) {
            alert(e);
        }
    }
}








function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
async function setPayerAndBlockhashTransaction(instructions, wallet) {
    const transaction = new Transaction();
    instructions.forEach(element => {
        transaction.add(element);
    });
    transaction.feePayer = wallet.publicKey;
    let hash = await connection.getRecentBlockhash();
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
}

