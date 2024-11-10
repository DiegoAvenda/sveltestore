import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } from '$env/static/private';
import webpush from 'web-push';
import client from '$lib/server/db.js';

async function sendNotification(subscription, payload) {
	try {
		const res = await webpush.sendNotification(subscription, payload);
		return {
			ok: res.statusCode === 201,
			status: res.statusCode,
			body: res.body
		};
	} catch (err) {
		const msg = `Could not send notification: ${err}`;
		console.error(msg);
		return {
			ok: false,
			status: undefined,
			body: msg
		};
	}
}

function initWebPush() {
	webpush.setVapidDetails('mailto:digago7@gmail.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

async function deleteIfExpired(userId) {
	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('chili');
		const users = db.collection('users');
		const filter = { googleId: userId };

		const updateDoc = {
			$set: {
				subscription: ''
			}
		};
		await users.updateOne(filter, updateDoc);
	} catch (error) {
		console.log(error);
	}
}

export async function notifUser(userId, payload) {
	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('chili');
		const users = db.collection('users');
		const query = { googleId: userId };
		const options = {
			projection: { _id: 0, subscription: 1 }
		};

		const result = await users.findOne(query, options);
		initWebPush();
		const res = await sendNotification(result.subscription, payload);

		if (!res.ok) {
			console.log('Failed to send notification');
		}

		//remove expired subscription
		if (res.status === 410) {
			deleteIfExpired(userId);
		}
	} catch (error) {
		console.log(error);
	}
}
