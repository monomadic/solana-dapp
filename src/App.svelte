<script lang="ts">
	import { Connection } from '@solana/web3.js';

	const connection = new Connection("https://api.devnet.solana.com", "confirmed");
	$: version = connection.getVersion();
</script>

<svelte:head>
  <script>
    global = globalThis // for solana web3 repo
  </script>
</svelte:head>

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
</main>

<style>
	h1 { color: #00FFA3; }
	:global(html)  {
		padding: 20px;
		background-color: black;
		color: white
	}
</style>
