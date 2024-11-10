export const load = async (event) => {
	if (!event.locals?.user) {
		return { customerId: null };
	}
	const customerId = event.locals.user?.googleId;
	return {
		customerId
	};
};
