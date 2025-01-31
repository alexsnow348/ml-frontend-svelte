<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
	let title= "ARRALYZE | Single Cell Dispensing, Imaging and Isolation"
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<ModeWatcher />
{@render children?.()}
