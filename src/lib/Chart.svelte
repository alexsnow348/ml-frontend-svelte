<script>
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';

  export let type = 'bar';
  export let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  export let data = [12, 19, 3, 5, 2, 3];

  let chartContainer;

  onMount(() => {
    if (!chartContainer) return;

    const ctx = chartContainer.getContext('2d');

    new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: 'Sales',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  });
</script>

<canvas bind:this={chartContainer}></canvas>
