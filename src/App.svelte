<script lang="ts">
	import { connect } from "./lib/wallet";
	import { pubKey } from "./stores/provider";

	async function onConnect() {
		await connect();
	}
</script>

<main>
	<h1>Solana, Bro.</h1>
	{#if $pubKey}
		<p>PubKey: {$pubKey}</p>
	{/if}
	<button on:click={onConnect}>Connect</button>
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
