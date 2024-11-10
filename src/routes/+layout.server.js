export function load({ locals }) {
	if (locals.user) {
		const userPicture = locals.user.picture;
		return { userPicture };
	}
}
