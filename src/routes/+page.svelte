<script lang="ts">
	import { setContext } from 'svelte'
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { currentImageIndex } from '$lib/context.js';

	// import Sun from 'lucide-svelte/icons/sun';
	// import Moon from 'lucide-svelte/icons/moon';
	
	// import { toggleMode } from 'mode-watcher';
	// import { Button } from '$lib/components/ui/button/index.js';

	import Chart from '$lib/components/line-chart.svelte';
	import ImageViewer from '$lib/components/image-viewer.svelte';
	import SearchAndSelect from '$lib/components/search-and-select.svelte';

	let { data } = $props();
	const experiments = data.data.dashboardData.experiments_list;
	let experimentName = $state(experiments[0].experiment_name);
	let transactionId = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.transaction_id ?? []
	);

	let runVersion = $state(experiments[0].uniqueRunVersion[0].value);
	const uniqueRunVersion = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.uniqueRunVersion ?? []
	);

	let runName = $state(experiments[0].uniqueRunName[0].value);
	const uniqueRunName = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.uniqueRunName ?? []
	);

	let wellName = $state(experiments[0].wellData[0].value);
	const wellData = $derived(
		experiments.find((f) => f.experiment_name === experimentName)?.wellData ?? []
	);

	const imagesFullPath = data.data.images;
	// derive the images array with the  well name, run name and run version
	const images = $derived(
		imagesFullPath.filter((image) => {
			const split = image.url.split('/');
			const version = split[4];
			const run = split[5];
			const well = split[7];
			return well === wellName && run === runName && version === runVersion;
		}).sort((a, b) => a.url.localeCompare(b.url))
	);

	setContext('currentImageIndex', currentImageIndex);
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
		<!-- <Button onclick={toggleMode} variant="outline" size="icon" class="absolute right-2 top-2">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button> -->
		<!-- Search and Select -->
		<div class="grid auto-rows-min gap-4 p-3 md:grid-cols-1">
			<div>
				<SearchAndSelect data={experiments} bind:value={experimentName} />
			</div>
		</div>
		
		<div class="grid auto-rows-min gap-4 p-3 pt-1 md:grid-cols-3">
			<div>
				<SearchAndSelect data={wellData} bind:value={wellName} />
			</div>
			<div>
				<SearchAndSelect data={uniqueRunVersion} bind:value={runVersion} />
			</div>
			<div>
				<SearchAndSelect data={uniqueRunName} bind:value={runName} />
			</div>
		</div>
	
		<!-- Summary -->
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<!-- <div class="grid auto-rows-min gap-4 md:grid-cols-1">
				<div class="aspect-video h-28 w-full rounded-xl bg-muted/50"></div>
				<div class="aspect-video h-28 w-full rounded-xl bg-muted/50"></div>
				<div class="aspect-video h-28 w-full rounded-xl bg-muted/50"></div>
				<div class="aspect-video h-28 w-full rounded-xl bg-muted/50"></div>
			</div> -->
			<div class="grid flex-1 flex-col gap-4 md:grid-cols-2">
				<div
					class="flex aspect-square items-center justify-center rounded-xl bg-muted/50 sm:min-h-min md:min-h-min"
				>
					<ImageViewer {images}  />
				</div>
				<!-- Graph -->
				
				<div class="aspect-video flex-col rounded-xl bg-muted/50 sm:min-h-min md:min-h-min">
					
					
					<Chart  {transactionId} {wellName} title="Cell Counting Over Time" />
					<!-- <button class="w-full h-12 bg-secondary rounded-xl">Download Data</button>
					<button class="w-full h-12 bg-secondary rounded-xl">Download Data</button>
					 -->
				</div>
		
			
				
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
