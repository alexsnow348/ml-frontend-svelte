<script>
	const { images = [] } = $props(); // Handling props with $props()

	const state = $state({
		currentIndex: 0
	});
	// function nextImage() {
	//   state.currentIndex = (state.currentIndex + 1) % images.length;
	// }

	// function prevImage() {
	//   state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
	// }

	function selectImage(index) {
		state.currentIndex = index;
	}
</script>

<div class="viewer">
	<img
		class="main-image h-full w-full rounded-xl shadow-md"
		src={images[state.currentIndex].url}
		alt="Main Image"
	/>

	<!-- <div>
      <button onclick={prevImage}>Previous</button>
      <button onclick={nextImage}>Next</button>
    </div>
   -->
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
		max-width: 100%;
		margin: auto;
	}
	.main-image {
		max-width: 95%;
		max-height: 95%;
		object-fit: contain;
		border: 2px solid #ccc;
		margin-bottom: 10px;
		margin-top: 10px;
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
