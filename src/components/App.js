import React, { useEffect } from "react";
import { Switch, Route } from "react-router";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	getLedgerWallet,
	getPhantomWallet,
	getSlopeWallet,
	getSolflareWallet,
	getSolletExtensionWallet,
	getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import Battle from "./layouts/Battle";
import BuildDeck from "./layouts/BuildDeck";
import Home from "./layouts/Home";
import Header from "./sections/Header";
import MarketPlace from "./layouts/MarketPlace";
import "../css/app.css";
import CardDetail from "./layouts/CardDetail";
import BattleStrategy from "./layouts/Battle-strategy";
import { fetchMarketplace } from "../actions";
import MyCards from "./layouts/Mycards";
require("@solana/wallet-adapter-react-ui/styles.css");

const App = () => {
	const dispatch = useDispatch();

	const network = WalletAdapterNetwork.Devnet;
	// You can also provide a custom RPC endpoint
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	// @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
	// Only the wallets you configure here will be compiled into your application
	const wallets = useMemo(
		() => [
			getPhantomWallet(),
			getSlopeWallet(),
			getSolflareWallet(),
			getLedgerWallet(),
			getSolletWallet({ network }),
			getSolletExtensionWallet({ network }),
		],
		[network]
	);

	useEffect(() => {
		const newSocket = io(`ws://localhost:3001`);

		dispatch({ type: "SET_SOCKET", payload: newSocket });
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchMarketplace());
	}, []);

	return (
		<div className="app-body" style={{}}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect={true}>
					<WalletModalProvider>
						<Header />
						<Switch>
							<Route path="/battle_strategy">
								<BattleStrategy />
							</Route>
							<Route path="/marketplace/card/:id">
								<CardDetail />
							</Route>
							<Route path="/marketplace">
								<MarketPlace />
							</Route>
							<Route path="/mycards">
								<MyCards />
							</Route>
							<Route path="/build_deck">
								<BuildDeck />
							</Route>
							<Route path="/battle">
								<Battle />
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
};

export default App;
