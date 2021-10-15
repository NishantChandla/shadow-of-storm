import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Wallet = () => {
	return (
		<WalletMultiButton
			style={{
				backgroundColor: "#B392DE",
				fontFamily: "'Press Start 2P', cursive",
				borderRadius: "15px",
				fontSize: "12px",
			}}
		/>
	);
};
