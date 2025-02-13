<script>
    import Select from 'svelte-select';
    import { cn } from '$lib/utils';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let value = [];
    let checked = [];
    let isChecked = {};

    $: computeValue(checked);
    $: computeIsChecked(checked);

    function computeIsChecked() {
        isChecked = {};
        checked.forEach((c) => (isChecked[c] = true));
    }

    function computeValue() {
        value = checked.map((c) => items.find((i) => i.value === c));
    }

    function handleChange(e) {
        if (e.type === 'clear' && Array.isArray(e.detail)) checked = [];
        else
            checked.includes(e.detail.value)
                ? (checked = checked.filter((i) => i != e.detail.value))
                : (checked = [...checked, e.detail.value]);
    }
</script>

<!-- listOffset={0}
    --list-border-radius="0 0 5px 5px"
    --item-first-border-radius="0"
    --border-radius={listOpen ? '5px 5px 0 0' : '5px'} -->
<Select
    {items}
    {value}
    multiple={true}
    filterSelectedItems={false}
    closeListOnChange={false}
    on:select={handleChange}
    on:clear={handleChange}
    class={cn(
        "border-input bg-background ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-12 w-full justify-between rounded-md border px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        value.length > 0 && 'ring-ring-primary'
    )}
    --border-radius= "{isChecked ? '5px 5px 0 0' : '5px'}" --placeholder-color="text-primary font-semibold" -->

    <div class="item text-primary" slot="item" let:item>
        <label for={item.value}>
            <input type="checkbox" id={item.value} bind:checked={isChecked[item.value]} class="text-primary font-semibold" />
            {item.label}
        </label>
    </div>
</Select>

<style>
    .item {
        pointer-events: none;
    }
</style>