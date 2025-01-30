export async function load({ fetch }) {
	const res = await fetch('/api/v1/dashboard/cellcounting/experiments');
	const data = await res.json();
	if (res.ok) {
		return { data };
	}

}
