<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	const { datasets = [], labels = [], title = 'Multi-Source Line Chart' } = $props();
	let canvas;
	let chart;

	const colors = [
		'green',
		'red',
		'blue',
		'rgb(255, 206, 86)',
		'rgb(153, 102, 255)',
		'rgb(255, 159, 64)'
	];

	function createChart() {
		if (chart) chart.destroy();

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels,
				datasets: datasets.map((ds, index) => ({
					label: ds.label,
					data: ds.data,
					borderColor: colors[index % colors.length],
					backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
					tension: 0.4,
					pointRadius: 3,
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
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: { color: '#555' },
						display: true,
						// offset: true,
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
						ticks: { color: '#555', stepSize: 15 },
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

	onMount(createChart);

	$effect(() => {
		if (chart) {
			chart.data.labels = labels;
			chart.data.datasets = datasets.map((ds, index) => ({
				label: ds.label,
				data: ds.data,
				borderColor: colors[index % colors.length],
				backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
				tension: 0.4,
				pointRadius: 3,
				fill: false
			}));
			chart.update();
		}
	});
</script>

<div class="chart-container">
	<canvas bind:this={canvas}></canvas>
</div>

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
