export async function load({ parent, data }) {
	await parent();
	return { data };
}
