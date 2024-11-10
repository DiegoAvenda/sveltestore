import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async ({ request }) => {
	const data = await request.json();
	const items = data.items;
	const customerId = data.customerId;

	const filteredItems = items.map((item) => ({
		name: item.name,
		quantity: item.quantity
	}));

	const itemsString = JSON.stringify(filteredItems);

	const line_items = items?.map((item) => {
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.name
					//images: [item.image],
				},
				unit_amount: item.price
			},
			quantity: item.quantity
		};
	});

	const session = await stripe.checkout.sessions.create({
		line_items,
		metadata: { items: itemsString, customerId },
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
