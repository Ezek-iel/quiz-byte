import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const defaultTheme: Theme = 'light';

// Create the theme store
const createThemeStore = () => {
    const { subscribe, set, update } = writable<Theme>(defaultTheme);

    return {
        subscribe,
        set: (value: Theme) => {
            set(value);
            if (browser) {
                localStorage.setItem('theme', value);
                document.documentElement.className = `theme-${value}`;
            }
        },
        toggle: () => update((theme) => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            if (browser) {
                localStorage.setItem('theme', newTheme);
                document.documentElement.className = `theme-${newTheme}`;
            }
            return newTheme;
        }),
        init: () => {
            if (browser) {
                // Try to get theme from localStorage
                const stored = localStorage.getItem('theme') as Theme;
                if (stored && (stored === 'light' || stored === 'dark')) {
                    set(stored);
                    document.documentElement.className = `theme-${stored}`;
                } else {
                    // Check for system preference
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const initialTheme = systemPrefersDark ? 'dark' : 'light';
                    set(initialTheme);
                    document.documentElement.className = `theme-${initialTheme}`;
                    localStorage.setItem('theme', initialTheme);
                }
            }
        }
    };
};

export const themeStore = createThemeStore();