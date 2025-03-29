<script lang="ts">
    import type { Snippet } from "svelte";
    let { children, size }: { children?: Snippet; size: number } = $props();
</script>

<div class="columns is-centered">
    <div class="column is-{size}">{@render children!()}</div>
</div>
