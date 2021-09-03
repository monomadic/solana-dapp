<script lang="ts">
	import { Connection, PublicKey } from '@solana/web3.js';

	const connection = new Connection("https://api.devnet.solana.com", "confirmed");
	const address = "E8WesoarH3innVAri5Ctg3uYi2pyRfuoR5RxBFtdeUiu";
	const pubKey = new PublicKey(address);

	$: version = connection.getVersion();
	$: balance = connection.getBalance(pubKey);
</script>

<main>
	<h1>
		Solana, Bro.
	</h1>

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
</main>

<style>
	h1 { color: #00FFA3; }
	:global(html)  {
		padding: 20px;
		background-color: black;
		color: white
	}
</style>
