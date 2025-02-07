import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const experimentsRes = await fetch('/api/v1/dashboard/cellcounting/experiments');
	const dashboardData = await experimentsRes.json();
	// get length of the experiments
	const uniqueExperimentUuid = [
		...new Set(dashboardData.experiments_list.map((item) => item.transaction_id))
	];
	// loop through the experiments and get the data for each experiment
	for (let i = 0; i < uniqueExperimentUuid.length; i++) {
		const uniqueDetailRes = await fetch(
			`/api/v1/dashboard/cellcounting/unique_details/${uniqueExperimentUuid[i]}`
		);
		const uniqueDetailsData = await uniqueDetailRes.json();
		const uniqueRunName = uniqueDetailsData.unique_details.run_name;
		const uniqueRunVersion = uniqueDetailsData.unique_details.run_version;
		const resultCellClass = uniqueDetailsData.unique_details.result_class_name;
		const wellData = uniqueDetailsData.unique_details.well_full_name;
		dashboardData.experiments_list[i].value = dashboardData.experiments_list[i].experiment_name;
		dashboardData.experiments_list[i].label = dashboardData.experiments_list[i].experiment_name;
		dashboardData.experiments_list[i].uniqueRunName = uniqueRunName;
		dashboardData.experiments_list[i].uniqueRunVersion = uniqueRunVersion;
		dashboardData.experiments_list[i].resultCellClass = resultCellClass;
		dashboardData.experiments_list[i].wellData = wellData;
	}
	//  create fetch function for images

	const fetchStates = async () => {
		try {
			let imagesFullPath = [];
			const responseImages = await fetch('/images/list');
			const images = await responseImages.json();
			imagesFullPath = images.map((image) => {
			return {
						url: `http://localhost:3000/images/${image}`,

					};
				});
			return imagesFullPath;
		
		} catch (e) {
			error(e.status, e.data?.message || e.message)
		}
	}
	// const responseImages = await fetch('/images/list');
	
	let images = await fetchStates();

	return { dashboardData , images}; // return the data
}
