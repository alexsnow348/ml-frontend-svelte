<script lang="ts">
	import { hasContext, getContext} from 'svelte';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import { getCellCountSummary } from '$lib/services/get-cell-count.js';
	let { transactionId, wellName, title = 'Multi-Source Line Chart' } = $props();
	Chart.register(annotationPlugin);

	let canvas = $state();
	let chart;
	let datasets = [];
	let labels = [];

	const colors = ['red', 'green', 'blue', 'gray'];
	
	// random light colors
	const randomColor = [
		'rgba(255, 99, 132)',
		'rgba(54, 162, 235)',
		'rgba(255, 206, 86)',
		'rgba(75, 192, 192)',
		'rgba(153, 102, 255)',
		'rgba(255, 159, 64)'
	];
	let countSummary = $state({});
	const currentImageIndex = getContext('currentImageIndex');
	currentImageIndex.subscribe((value) => {
		if (chart) {
			chart.options.plugins.annotation.annotations = generateAnnotations(labels, value);
			chart.update();
		}
		console.log(value);
	});
	
	function generateAnnotations(labels, currentImageIndex) {
		let annotations = {};
		const sixHoursInSeconds = 6 * 60 * 60;
		labels.forEach((label, index) => {		
			const seconds = labels[index];
			if (seconds % sixHoursInSeconds < 200 && index > 0) {
				console.log(seconds % sixHoursInSeconds);
				let lineId = Math.floor(seconds / sixHoursInSeconds);
				// crete line id
				annotations[`line_${lineId}`] = {
					type: 'line',
					xMin: index,
					xMax: index,
					borderColor: '#234f96',
					borderWidth: 2
				};
			}
			if (index === currentImageIndex) {
				let lineId = "image";
				// crete line id
				annotations[`line_${lineId}`] = {
					type: 'line',
					xMin: index,
					xMax: index,
					borderColor: 'gray',
					borderWidth: 2
				};
			}
		});
		console.log(annotations);
		return annotations;
	}

	function selectColor(label: string, index: number) {
		// check 100 included in label value to set the color
		const labelSplit = label.split('_');
		if (labelSplit.length < 3) {
			if (labelSplit.length === 1) return colors[3];
			return randomColor[index % randomColor.length];
		}

		if (labelSplit[2] === '100') return colors[0];
		if (labelSplit[2] === '010') return colors[1];
		if (labelSplit[2] === '001') return colors[2];
	}

	function secondToString(seconds: number[]) {
		return seconds.map((sec) => {
			const days = Math.floor(sec / (24 * 60 * 60));
			const hours = Math.floor((sec % (24 * 60 * 60)) / (60 * 60));
			const minutes = Math.floor((sec % (60 * 60)) / 60);
			if (days === 0) return `${hours}h:${minutes}m`;
			return `${days}d:${hours}h:${minutes}m`;
		});
	}

	function createChart() {
		if (chart) chart.destroy();
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: secondToString(labels),
				datasets: datasets.map((ds, index) => ({
					label: ds.label,
					data: ds.data,
					borderColor: selectColor(ds.label, index),
					backgroundColor: selectColor(ds.label, index).replace('1)', '0.2)'),
					tension: 0.4,
					pointRadius: 0,
					fill: false
				}))
			},
			options: {
				responsive: true,
				interaction: {
					mode: 'index',
					intersect: false
				},
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: true,
						labels: {
							color: '#234f96',
							font: { size: 10, weight: 'bold' },
							usePointStyle: true
						}
					},
					title: {
						display: true,
						text: title,
						align: 'start',
						color: '#234f96',
						font: { size: 18, weight: 'bold' },
						padding: { top: 10, bottom: 20 }
					},
					tooltip: {
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						titleColor: '#fff',
						bodyColor: '#fff',
						borderWidth: 1,
						borderColor: '#0077b6',
						padding: 10
					},

					annotation: {
						annotations: generateAnnotations(labels, 0)
					}
				},
				scales: {
					x: {
						grid: { color: 'rgba(200, 200, 200, 0.2)' },
						ticks: {
							color: '#555',
							stepSize: 4 // 6 hours interval 15 minutes
						},
						title: {
							display: true,
							text: 'Duration',
							color: '#234f96',
							font: {
								size: 12,
								weight: 'bold',
								lineHeight: 1.2
							},
							padding: { top: 1, left: 0, right: 0, bottom: 0 }
						}
					},
					y: {
						grid: { color: 'rgba(200, 200, 200, 0.2)' },
						ticks: { color: '#555', stepSize: 5 },
						title: {
							display: true,
							text: 'Count',
							color: '#234f96',
							font: {
								size: 12,
								weight: 'bold',
								lineHeight: 1.2
							},
							padding: { top: 1, left: 0, right: 0, bottom: 0 }
						}
					}
				}
			}
		});
	}
	const fetchCount = async (transactionId: any, wellName: any) => {
		if (!transactionId || !wellName) return;
		try {
			countSummary = await getCellCountSummary(transactionId, wellName);
			// loop through the countSummary and create datasets and labels
			datasets = countSummary.count_summary.map((summary: any) => ({
				label: summary.label,
				data: summary.data.map((d: any) => d)
			}));
			labels = countSummary.duration.map((d: any) => d);
			return countSummary;
		} catch (error) {
			console.log(error);
		}
	};

	onMount(async () => {
		await fetchCount(transactionId, wellName);
		createChart();
		
	});

	// call the fetchCount function if the transactionId or wellName changes
	$effect(() => {
		// make sure the datasets and labels are updated before updating the chart
		fetchCount(transactionId, wellName)
			.then(() => {
				// Data fetched successfully
				if (chart) {
					chart.data.labels = secondToString(labels);
					chart.data.datasets = datasets.map((ds, index) => ({
						label: ds.label,
						data: ds.data,
						borderColor: selectColor(ds.label, index),
						backgroundColor: selectColor(ds.label, index).replace('1)', '0.2)'),
						tension: 0.4,
						pointRadius: 0,
						fill: false
					}));
					chart.update();
				}
			})
			.catch(() => {
				// Fetching data
			});
	});

</script>

{#await countSummary}
	<span class="text-primary">Loading...</span>
	<LoaderCircle class="w-8 h-8 text-primary animate-spin" />
{:then}
	<div class="chart-container">
		<canvas bind:this={canvas}></canvas>
	</div>
{:catch error}
	<div class="chart-container">
		<p>{error.message}</p>
	</div>
{/await}

<style>
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 20px;
		/* background: #f9f9f9; */
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
	}
</style>
