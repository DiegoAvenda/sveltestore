import Stripe from 'stripe';
import client from '$lib/server/db.js';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { notifUser } from '$lib/server/db/subscriptionDb';

const adminGoogleId = '100935988500638449773';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({ request }) {
	const rawBody = await request.arrayBuffer();

	const event = await stripe.webhooks.constructEvent(
		Buffer.from(rawBody),
		request.headers.get('stripe-signature'),
		STRIPE_WEBHOOK_SECRET
	);

	if (event.type === 'checkout.session.completed') {
		const charge = event.data.object;
		const customerId = charge.metadata.customerId;
		const items = JSON.parse(charge.metadata.items);
		const totalPrice = charge.amount_total;

		try {
			const mongoClient = await client.connect();
			const db = mongoClient.db('chili');
			const orders = db.collection('orders');

			await orders.insertOne({
				customerId,
				items,
				totalPrice,
				createdAt: new Date(), // Fecha y hora de creación
				status: 'pending'
			});
			console.log('orden creada');

			notifUser(adminGoogleId, 'Tienes un nuevo pedido');

			//revalidatePath("/")
			//return { successMsg: "order created" }
		} catch (e) {
			console.error(e);
			//return { error: "Failed to create order" }
		}
	}
	return json({ message: 'exito' });
}
