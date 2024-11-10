import { fail } from '@sveltejs/kit';
import { STRIPE_SECRET_KEY } from '$env/static/private';

import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const actions = {
	default: async ({ locals, request }) => {
		if (locals.session === null) {
			return fail(400, { missing: true });
		}
		const data = await request.formData();
		const totalPrice = data.get('totalPrice');

		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalPrice,
			currency: 'USD'
		});
		if (paymentIntent.client_secret == null) {
			return fail(400, { error: true });
		}
		return { clientSecret: paymentIntent.client_secret };
	}
};
