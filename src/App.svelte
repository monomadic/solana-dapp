<script lang="ts">
	import { connect, disconnect } from "./lib/wallet";
	import { pubKey } from "./stores/provider";

	async function onConnect() {
		await connect();
	}
</script>

<main>
	<h1>Solana, Bro.</h1>
	{#if $pubKey}
		<p>PubKey: {$pubKey}</p>
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
