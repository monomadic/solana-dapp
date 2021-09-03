<script lang="ts">
	import { getBalance } from "./lib/provider";

	import { connect, disconnect } from "./lib/wallet";
	import { pubKey } from "./stores/signer";

	$: balance = $pubKey && getBalance($pubKey);

	async function onConnect() {
		await connect();
	}
</script>

<main>
	<h1>Solana, Bro.</h1>
	{#if $pubKey}
		<p>PubKey: {$pubKey}</p>

		<p>
			SOL Balance:
			{#await balance}
				...
			{:then _balance}
				{(_balance / 1e9).toLocaleString("en", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			{:catch err}
				{err.message}
			{/await}
		</p>

		<button on:click={disconnect}>Disconnect</button>
	{:else}
		<button on:click={onConnect}>Connect</button>
	{/if}
</main>

<style>
	h1 {
		color: #00ffa3;
	}
	:global(html) {
		padding: 20px;
		background-color: black;
		color: white;
	}
</style>
