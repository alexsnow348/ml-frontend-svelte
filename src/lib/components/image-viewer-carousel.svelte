<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
    
    let api = $state<CarouselAPI>();
    
    const count = $derived(api ? api.scrollSnapList().length : 0);
    const { images = [] } = $props(); // Handling props with $props()
    let current = $state(0);
    
    $effect(() => {
     if (api) {
      current = api.selectedScrollSnap() + 1;
      api.on("select", () => {
       current = api!.selectedScrollSnap() + 1;
      });
     }
    });
   </script>
    
   <div>
    <Carousel.Root
     setApi={(emblaApi) => (api = emblaApi)}
     class="w-full max-w-xl"
    >
     <Carousel.Content>
      {#each Array(images.length) as _, i (i)}
       <Carousel.Item>
        <Card.Root>
         <Card.Content
          class="flex aspect-square items-center justify-center"
         >
          <!-- <span class="text-4xl font-semibold">{i + 1}</span> -->
            <img
             src={`${
              images[i].url
             }`}
             alt={`Image ${i + 1}`}
             class="w-full h-full object-cover"
            />
         </Card.Content>
        </Card.Root>
       </Carousel.Item>
      {/each}
     </Carousel.Content>
     <Carousel.Previous />
     <Carousel.Next />
    </Carousel.Root>
    <div class="text-muted-foreground py-2 text-center text-sm">
     Slide {current} of {count}
    </div>
   </div>