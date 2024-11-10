import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';

export async function load() {}

export const actions = {
	signOut: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	},
	testNotification: async ({ locals }) => {
		const username = locals.username;
		if (!username) {
			throw error(400, 'Not logged in');
		}

		notifUser(username, 'This is a test notification');
	}
};
