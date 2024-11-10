import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { notifUser } from '$lib/server/db/subscriptionDb';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	const userName = event.locals.user.name;
	const customerId = event.locals.user.googleId;
	return {
		userName,
		customerId
	};
};

export const actions = {
	testNotification: async ({ locals }) => {
		const userId = locals.user?.googleId;
		if (!userId) {
			throw error(400, 'Not logged in');
		}

		notifUser(userId, 'This is a test notification');
	}
};
