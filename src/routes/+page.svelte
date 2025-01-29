<script>
    import Chart from '$lib/Chart.svelte';
  </script>
  
  <main>
    <h1>Dashboard</h1>
    <Chart type="line" labels={['Jan', 'Feb', 'Mar']} data={[5, 10, 15]} />
    <Chart type="bar" labels={['Jan', 'Feb', 'Mar']} data={[5, 10, 15]} />
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2rem;
    }
  </style>
  