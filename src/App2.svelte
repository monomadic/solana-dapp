
<script lang="ts">
	import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
	// import {default as Wallet} from '@project-serum/sol-wallet-adapter';
	const Wallet = require('@project-serum/sol-wallet-adapter');

	const network = clusterApiUrl("devnet");
	const connection = new Connection(network);
	const providerUrl = 'https://www.sollet.io';
	// const wallet = new Wallet(providerUrl, network);

	$: pubKey = undefined;
	$: version = connection.getVersion();
	$: balance = pubKey && connection.getBalance($pubKey);

	async function onConnect() {
		// assumptions here, abstract later
		let wallet = new Wallet(
			(window as unknown as { solana: unknown }).solana,
			network,
		);

		await wallet.connect();

		wallet.on('connect', () => {
			console.log("connected injected wallet");
		});

		pubKey = wallet.publicKey?.toBase58();
		console.log(wallet.publicKey);
	}
</script>

<main>
	<h1>
		Solana, Bro.
	</h1>

	<p>Address: {$pubKey}</p>

	{#await version}
		<p>Getting Version...</p>
	{:then ver}
		<p>Core Version: {ver['solana-core']}</p>
	{:catch err}
		<p>Error: {err.message}</p>
	{/await}

	{#await balance}
		<p>Getting Balance...</p>
	{:then balance}
		<p>SOL Balance: {(balance / 1e9).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
	{:catch err}
		<p>Error: {err.message}</p>
	{/await}

	<button on:click={onConnect}>Connect</button>
</main>

<style>
	h1 { color: #00FFA3; }
	:global(html)  {
		padding: 20px;
		background-color: black;
		color: white
	}
</style>
