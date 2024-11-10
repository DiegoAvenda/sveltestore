<script>
	import { cart } from '$lib/cart.svelte.js';
</script>

<h1>checkout page</h1>

{#if cart}
	{#each cart as item}
		<p>{item.name}</p>
	{/each}
{/if}
