<script>
	import { addToCart } from '$lib/cart.svelte.js';
	import { products } from '$lib/products';
</script>

{#each products as product}
	<div class="card w-96 bg-base-100 shadow-xl">
		<figure>
			<img width="200" src={product.image} alt={product.name} />
		</figure>
		<div class="card-body">
			<h2 class="card-title">{product.name}</h2>
			<p>$ {product.price}</p>
			<div class="card-actions justify-end">
				<button onclick={() => addToCart(product)} class="btn btn-primary">Add to cart</button>
			</div>
		</div>
	</div>
{/each}
