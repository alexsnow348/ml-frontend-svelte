<script>
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.ts";
  </script>
  
  <main>
    <Button onclick={toggleMode} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
    <!-- <Chart type="line" labels={['Jan', 'Feb', 'Mar']} data={[5, 10, 15]} /> -->
    <!-- <Chart type="bar" labels={['Jan', 'Feb', 'Mar']} data={[5, 10, 15]} /> -->
    <!-- <Button>Click me</Button> -->
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2rem;
    }
  </style>
  