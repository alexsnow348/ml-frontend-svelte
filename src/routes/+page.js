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
		const experimentData = await uniqueDetailRes.json();
		// console.log(experimentData.unique_details);
		// add the data to the experiments_list
		dashboardData.experiments_list[i].uniqueDetail = experimentData.unique_details;

		// // get the data for the experiment
		// const summaryDataRes = await fetch(
		// 	`/api/v1/dashboard/cellcounting/summary/${uniqueExperimentUuid[i]}`
		// );
		// const summaryData = await summaryDataRes.json();
		// // add the data to the experiments_list
		// dashboardData.experiments_list[i].summaryData = summaryData;
	}
	// console.log(dashboardData.experiments_list[0].uniqueDetail);
	// console.log(dashboardData.experiments_list[0].summaryData);
	return { dashboardData };
}
