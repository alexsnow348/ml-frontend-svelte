import { wellData } from './well.js';

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
		const uniqueRunName = [];
		const uniqueRunVersion = [];
		const runName = uniqueDetailsData.unique_details.run_name;
		for (let i = 0; i < runName.length; i++) {
			uniqueRunName.push({ value: runName[i], label: runName[i] });
		}

		const runVersion = uniqueDetailsData.unique_details.run_version;
		for (let i = 0; i < runVersion.length; i++) {
			uniqueRunVersion.push({ value: runVersion[i], label: runVersion[i] });
		}
		dashboardData.experiments_list[i].value = dashboardData.experiments_list[i].experiment_name;
		dashboardData.experiments_list[i].label = dashboardData.experiments_list[i].experiment_name;
		dashboardData.experiments_list[i].uniqueRunName = uniqueRunName;
		dashboardData.experiments_list[i].uniqueRunVersion = uniqueRunVersion;
		dashboardData.experiments_list[i].wellData = wellData;
	}
	const responseImages = await fetch('/images/list');
	const images = await responseImages.json();
	const imagesFullPath = images.map((image) => {
		return {
			url: `http://localhost:3000/images/${image}`,

		};
	});
	dashboardData.imagesFullPath = imagesFullPath;
	return { dashboardData };
}
