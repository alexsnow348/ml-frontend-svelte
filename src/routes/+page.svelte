<script lang="ts">
	import { onMount } from 'svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

  	import Chart from "$lib/components/line-chart.svelte";

	import ImageViewer from '$lib/components/image-viewer.svelte';

	let { data } = $props();	
	const experiments = data.dashboardData.experiments_list;

	let experimentName = $state(experiments[0].experiment_name);
	const triggerExperiment = $derived(
		experiments.find((experiment) => experiment.experiment_name === experimentName)
			?.experiment_name ?? 'Select an Experiment'
	);
	console.log(experiments[0].uniqueRunName[0].value);
	let runVersion = $state(experiments[0].uniqueRunVersion[0].value);
	const uniqueRunVersion = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.uniqueRunVersion ?? []
	)
	const triggerRunVersion = $derived(
		uniqueRunVersion.find((version) => version.value === runVersion)?.label ?? 'Select a Run Version'
	);
	let runName = $state(experiments[0].uniqueRunName[0].value);
	const uniqueRunName = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.uniqueRunName ?? []
	)
	const triggerRunName = $derived(
		uniqueRunName.find((name) => name.value === runName)?.label ?? 'Select a Run Name'
	);

	let wellName = $state(experiments[0].wellData[0].value);
	const wellData = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.wellData ?? []
	)
	const triggerWell = $derived(
		wellData.find((well) => well.value === wellName)?.label ?? 'Select a Well'
	);

	const imagesFullPath = data.dashboardData.imagesFullPath;

	// derive the images array with the  well name, run name and run version
	
	const images = $derived(
		imagesFullPath.filter((image) => {
			const split = image.url.split('/');
			const version = split[4];
			const run = split[5];
			const well = split[7];
			return well === wellName && run === runName && version === runVersion;
		})
	);
	// sort the images with the url
	images.sort((a, b) => a.url.localeCompare(b.url));
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
				<Select.Root type="single" name="selectedExperimentName" bind:value={experimentName}>
					<Select.Trigger class="aspect-auto rounded-xl bg-muted/50">
						{triggerExperiment}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Experiment</Select.GroupHeading>
							{#each experiments as experiment}
								<Select.Item value={experiment.experiment_name} label={experiment.experiment_name}
									>{experiment.experiment_name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div>
				<Select.Root type="single" name="selectedRunVersion" bind:value={runVersion}>
					<Select.Trigger class="aspect-auto rounded-xl bg-muted/50">
						{triggerRunVersion}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Run Version</Select.GroupHeading>
							{#each uniqueRunVersion as version}
								<Select.Item value={version.value} label={version.label}
									>{version.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div>
				<Select.Root type="single" name="selectedRunName" bind:value={runName}>
					<Select.Trigger class="aspect-auto rounded-xl bg-muted/50">
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
				<Select.Root type="single" name="selectedWell" bind:value={wellName}>
					<Select.Trigger class="aspect-video rounded-xl bg-muted/50">
						{triggerWell}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Well</Select.GroupHeading>
							{#each wellData as well}
								<Select.Item value={well.value} label={well.label}>{well.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<!-- Summary -->
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-4">
				<div class="aspect-video rounded-xl bg-muted/50 w-full h-28"></div>
				<div class="aspect-video rounded-xl bg-muted/50 w-full h-28"></div>
				<div class="aspect-video rounded-xl bg-muted/50 w-full h-28"></div>
				<div class="aspect-video rounded-xl bg-muted/50 w-full h-28"></div>
			</div>
			<!-- Graph -->
			<div class="grid flex-1 flex-col gap-4 md:grid-cols-2">
				<!-- <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
					<Chart />
				</div> -->
				<div class="aspect-auto flex rounded-xl bg-muted/50 md:min-h-min justify-center items-center">
					<!-- <img src={imageSrc} alt="Local Image" class="shadow-md rounded-xl max-w-full h-full"/> -->
					 <ImageViewer {images}  />
				  </div>
				<div class="aspect-video flex rounded-xl bg-muted/50 md:min-h-min">
					<Chart />
				</div>
			</div>
		
			
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
