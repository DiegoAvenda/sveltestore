export let cart = $state([]);

export function addToCart(product) {
	const existingProduct = cart.find((item) => item.id === product.id);
	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		cart.push({ ...product, quantity: 1 });
	}
}

export function removeFromCart(productId) {
	const index = cart.findIndex((item) => item.id === productId);
	if (index !== -1) {
		cart.splice(index, 1);
	}
}

export function substractFromCart(product) {
	const existingProduct = cart.find((item) => item.id === product.id);
	if (existingProduct.quantity > 1) {
		existingProduct.quantity -= 1;
	} else {
		const index = cart.findIndex((item) => item.id === product.id);
		if (index !== -1) {
			cart.splice(index, 1);
		}
	}
}
