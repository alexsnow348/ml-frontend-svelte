<script lang="ts" module>

	import ChartNoAxesCombined from 'lucide-svelte/icons/chart-no-axes-combined';

	let logoPath = './logo_arralyze.svg';
	// This is sample data.
	const data = {
		teams: [
			{
				name: "LPKF Laser & Electronics",
				logo: logoPath,
				plan: "Arraylze",
			}
		],
		navMain: [
			{
				title: "Dashboard",
				url: "#",
				icon: ChartNoAxesCombined,
				isActive: true,
				items: [
					{
						title: "Well Analysis",
						url: "#",
					},
				],
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "$lib/components/nav-main.svelte";
	import TeamSwitcher from "$lib/components/team-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>