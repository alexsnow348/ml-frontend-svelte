<script lang="ts">
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    let {data = [], value = $bindable()} = $props();

    
    let open = $state(false);
    let triggerRef = $state<HTMLButtonElement>(null!);
  
    let  triggerValue = $derived(
        data.find((f) => f.value === value)?.label
    );
    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger() {
     open = false;
     tick().then(() => {
      triggerRef.focus();
     });
    }
   </script>
    
   <Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
     {#snippet child({ props })}
      <Button
       variant="outline"
       class={cn(
		"border-input bg-background ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-12 w-full justify-between rounded-md border px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
		triggerValue
	)}
       {...props}
       role="combobox"
       aria-expanded={open}
      >
       {triggerValue || "Select ..."}
       <ChevronsUpDown class="opacity-50" />
      </Button>
     {/snippet}
    </Popover.Trigger>
    <Popover.Content class={cn(
        "h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1", triggerValue
    )}>
     <Command.Root>
      <Command.Input placeholder="Search ..." />
      <Command.List>
       <Command.Empty>No framework found.</Command.Empty>
       <Command.Group>
        {#each data as framework}
         <Command.Item
          value={framework.value}
          onSelect={() => {
           value = framework.value;
           closeAndFocusTrigger();
          }}
         >
          <Check
           class={cn(value !== framework.value && "text-transparent")}
          />
          {framework.label}
         </Command.Item>
        {/each}
       </Command.Group>
      </Command.List>
     </Command.Root>
    </Popover.Content>
   </Popover.Root>