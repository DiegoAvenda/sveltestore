<script>
	import { page } from '$app/stores';
	import { cart } from '$lib/cart.svelte.js';
	let { data } = $props();

	let totalPrice = $page.params.slug;
	let toggle = $state(false);

	async function checkout() {
		if (data.customerId === null) {
			toggle = true;
			return;
		}

		await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items: cart, customerId: data.customerId })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	}
</script>

checkout slug: ${totalPrice}

<button class="btn" onclick={() => checkout()}>Checkout with Stripe</button>
{#if toggle}
	<p>autenticate primero</p>
{/if}
