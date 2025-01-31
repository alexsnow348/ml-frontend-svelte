<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
  
    let chartCanvas;
    
    onMount(() => {
      if (!chartCanvas) return;
  
      const ctx = chartCanvas.getContext("2d");
  
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Dataset 1",
              data: [30, 50, 40, 60, 70, 90],
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Dataset 2",
              data: [40, 60, 50, 80, 90, 110],
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
      });
    });
  </script>
  
  <div class="w-full h-full">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  