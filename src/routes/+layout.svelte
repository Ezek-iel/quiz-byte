<script lang="ts">
    import "../styles/style.css";
    import { themeStore } from '$lib/stores/theme';
    import { onMount } from 'svelte';
    import ThemeToggle from '$lib/shared/ThemeToggle.svelte';

    let {children} = $props();

    onMount(() => {
        themeStore.init();
    });
</script>

<!-- * All general page configurations are kept here -->

<div class="is-flex is-justify-content-flex-end p-4">
    <ThemeToggle />
</div>

{@render children()}    