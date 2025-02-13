<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Switch } from "$lib/components/ui/switch/index.js";
	const { images = [] } = $props(); // Handling props with $props()

	const state = $state({
		currentIndex: 0
	});
	// function nextImage() {
	//   state.currentIndex = (state.currentIndex + 1) % images.length;
	// }

	// function prevImage() {
	//   state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
	//  }

	const currentImageIndex = getContext("currentImageIndex");
	
	function selectImage(index) {
		state.currentIndex = index;
		currentImageIndex.set(state.currentIndex);
	
	}
	
	let boundingBoxMode = $state(false);
	
	
	
</script>

<div class="viewer p-6">
	<img
		class="main-image h-full w-full rounded-xl shadow-md"
		src={images[state.currentIndex].url}
		alt="Main Image"
	/>

	<div>
		<div class="flex items-left space-x-2  p-6">
			<Switch id="airplane-mode"  bind:checked={boundingBoxMode}/>
			<Label for="airplane-mode">Bounding Box Mode</Label>
		</div>
      <!-- <button onclick={prevImage}>Previous</button>
      <button onclick={nextImage}>Next</button> -->
    </div>
  
	
	<div class="thumbnails">
		{#each images as image, index}
			<img
				src={image.url}
				class="thumbnail {index === state.currentIndex ? 'active' : ''}"
				alt="Thumbnail"
				onclick={() => selectImage(index)}
			/>
		{/each}
	</div>
</div>

<style>
	.viewer {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 90%;
		margin: auto;
	}
	.main-image {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		border: 2px solid #ccc;
		margin-bottom: 10px;
	}
	.thumbnails {
		display: flex;
		gap: 5px;
		overflow-x: auto;
	}
	.thumbnail {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border: 2px solid transparent;
		cursor: pointer;
	}
	.thumbnail.active {
		border-color: #007bff;
	}
	/* button {
		margin: 5px;
		padding: 8px 12px;
		cursor: pointer;
	} */
</style>
