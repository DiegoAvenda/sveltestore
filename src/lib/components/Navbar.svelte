<script>
	import { cart } from '$lib/cart.svelte.js';
	import { enhance } from '$app/forms';
	let { userPicture } = $props();
	import CartItem from './CartItem.svelte';

	let totalPrice = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Home</a>
		<a href="/checkout" class="btn btn-ghost text-xl">Checkout</a>
		<a href="/notifications" class="btn btn-ghost text-xl">Notifications</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
				<div class="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<span class="badge indicator-item badge-sm">{cart?.length | 0}</span>
				</div>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				tabindex="0"
				class="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
			>
				<div class="card-body">
					<span class="text-lg font-bold">{cart?.length | 0} items</span>
					{#if cart}
						{#each cart as item}
							<CartItem cartItem={item} />
						{/each}
					{/if}
					<span class="text-info">Subtotal: {totalPrice}</span>
					<div class="card-actions">
						<a href="/checkout/{totalPrice}"
							><button class="btn btn-primary btn-block">Checkout</button></a
						>
					</div>
				</div>
			</div>
		</div>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src={userPicture
							? userPicture
							: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
					/>
				</div>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul
				tabindex="0"
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
			>
				<li>
					<a href="/profile" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/api/oauth/google">Login</a></li>
				<li>
					<form method="post" use:enhance action="/?/signOut">
						<button class="btn">Sign out</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>
