<script>
	let { cartItem } = $props();
	import { substractFromCart, removeFromCart, addToCart } from '$lib/cart.svelte.js';
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
	<figure>
		<img width="75" src={cartItem.image} alt={cartItem.name} />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{cartItem.name}</h2>
		<p>{cartItem.quantity}</p>
		<div class="card-actions justify-end">
			<button onclick={() => addToCart(cartItem)} class="btn btn-primary btn-xs">+</button>
			<button onclick={() => substractFromCart(cartItem)} class="btn btn-primary btn-xs">-</button>
			<button onclick={() => removeFromCart(cartItem.id)} class="btn btn-primary btn-xs"
				>Remove</button
			>
		</div>
	</div>
</div>
