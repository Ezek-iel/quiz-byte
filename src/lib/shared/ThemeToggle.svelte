<script lang="ts">
    import { themeStore } from '$lib/stores/theme';
    import { Sun, Moon } from 'lucide-svelte';

    let theme = $state('light');

    // Subscribe to theme changes
    $effect(() => {
        return themeStore.subscribe((value) => {
            theme = value;
        });
    });

    function toggleTheme() {
        themeStore.toggle();
    }
</script>

<button 
    class="button is-ghost" 
    onclick={toggleTheme}
    title="Toggle {theme === 'light' ? 'dark' : 'light'} mode"
    aria-label="Toggle {theme === 'light' ? 'dark' : 'light'} mode"
>
    <span class="icon">
        {#if theme === 'light'}
            <Moon size={20} />
        {:else}
            <Sun size={20} />
        {/if}
    </span>
</button>