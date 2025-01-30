<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	let { data } = $props();
	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'pineapple', label: 'Pineapple' }
	];

	let value = $state('');
	let experiment_name = $state('');
	const experiments = data.dashboardData.experiments_list;
	// derived unique details from experiments
	// const uniqueRunName = experiments.map((experiment) => ({
	const uniqueRunName = [];
	const uniqueRunVersion = [];
	for (let i = 0; i < experiments.length; i++) {
		const runName = experiments[i].uniqueDetail.run_name;
		for (let i = 0; i < runName.length; i++) {
			uniqueRunName.push({ value: runName[i], label: runName[i] });
		}
		const runVersion = experiments[i].uniqueDetail.run_version;
		for (let i = 0; i < runVersion.length; i++) {
			uniqueRunVersion.push({ value: runVersion[i], label: runVersion[i] });
		}

	}
	const triggerExperiment = $derived(experiments.find((experiment) => experiment.experiment_name === experiment_name)?.experiment_name ?? 'Select an Experiment');
	const triggerRunVersion = $derived(uniqueRunVersion.find((version) => version.value === value)?.label ?? 'Select a Run Version');
	const triggerRunName = $derived(uniqueRunName.find((name) => name.value === value)?.label ?? 'Select a Run Name');
	const triggerWell = $derived(fruits.find((f) => f.value === value)?.label ?? 'Select a Well');
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Well Analysis</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<Button onclick={toggleMode} variant="outline" size="icon" class="absolute right-2 top-2">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	
		<div class="grid auto-rows-min gap-4 p-5 pt-0 md:grid-cols-4">
			<div>
				<Select.Root type="single" name="selected Experiment" bind:value>
					<Select.Trigger class="aspect-video rounded-xl bg-muted/50">
						{triggerExperiment}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Experiment</Select.GroupHeading>
							{#each experiments as experiment}
								<Select.Item value={experiment.experiment_name} label={experiment.experiment_name}>{experiment.experiment_name}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div>
				<Select.Root type="single" name="selectedRunVersion" bind:value>
					<Select.Trigger class="aspect-video rounded-xl bg-muted/50">
						{triggerRunVersion}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Run Version</Select.GroupHeading>
							{#each uniqueRunVersion as version}
								<Select.Item value={version.value} label={version.label}>{version.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div>
				<Select.Root type="single" name="selectedRunName" bind:value>
					<Select.Trigger class="aspect-video rounded-xl bg-muted/50">
						{triggerRunName}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Run Name</Select.GroupHeading>
							{#each uniqueRunName as name}
								<Select.Item value={name.value} label={name.label}>{name.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div>
				<Select.Root type="single" name="selectedWell" bind:value>
					<Select.Trigger class="aspect-video rounded-xl bg-muted/50">
						{triggerWell}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Well</Select.GroupHeading>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<!-- Summary -->
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="aspect-video rounded-xl bg-muted/50"></div>
				<div class="aspect-video rounded-xl bg-muted/50"></div>
				<div class="aspect-video rounded-xl bg-muted/50"></div>
			</div>
			<!-- Graph -->
			<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
