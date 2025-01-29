export async function load({ fetch }) {
	const res = await fetch('http://localhost:5051/api/v1/dashboard/cellcounting/experiments');
	const data = await res.json();
	if (res.ok) {
		return { data };
	}
}
