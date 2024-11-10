import { error, json } from '@sveltejs/kit';
import client from '$lib/server/db.js';

export const POST = async ({ locals, request }) => {
	const userId = locals?.user.googleId;

	if (!userId) {
		console.log('No username passed to addSubscription');
		throw error(401, 'Unauthorized');
	}

	const data = await request.json();

	if (!data.subscription) {
		console.log('No subscription passed to addSubscription', data);
		throw error(400, 'Bad Request');
	}

	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('chili');
		const users = db.collection('users');
		const filter = { googleId: userId };
		const updateDoc = {
			$set: {
				subscription: data.subscription
			}
		};
		await users.updateOne(filter, updateDoc);

		return json({ success: true });
	} catch (e) {
		console.log(e);
	}
};
