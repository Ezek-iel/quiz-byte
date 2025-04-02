<script lang="ts">
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
    import { SearchIcon } from "lucide-svelte";
    import { enhance } from "$app/forms";

    let inputValue = $state("");
    let emulateLoading = $state(false);
</script>

<section class="hero is-large">
    <div class="hero-body">
        <div
            class="container is-flex is-flex-direction-column is-justify-content-center"
        >
            <CenterColumn size={8}>
                <div
                    class="is-flex is-align-items-center is-justify-content-center is-gap-1"
                >
                    <p
                        class="is-size-1 has-text-weight-bold has-text-centered has-text-primary-20"
                    >
                        Quizbyte
                    </p>
                </div>
                <p class="is-size-4 has-text-weight-semibold has-text-centered">
                    Generate Customizable <span
                        class="has-text-primary-30 is-underlined has-text-weight-bold"
                        >Quizzes</span
                    > on any topic with AI
                </p>
                <CenterColumn size={8}>
                    <form method="POST" action="/" class="mt-5" use:enhance>
                        <div class="columns is-mobile">
                            <div class="column is-9">
                                <div class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <SearchIcon />
                                    </span>
                                    <input
                                        type="text"
                                        class="input"
                                        placeholder="Enter a quiz topic..."
                                        name="topic"
                                        bind:value={inputValue}
                                    />
                                </div>
                            </div>
                            <div class="column is-3">
                                <div class="control">
                                    <button
                                        class="button is-primary {emulateLoading ? 'is-loading' : ''}"
                                        type="submit"
                                        disabled={!inputValue}
                                        onclick={() => {
                                            emulateLoading = true;
                                        }}
                                    >
                                        <span class="icon">
                                            <SearchIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CenterColumn>
                <p class="is-size-7 has-text-grey has-text-centered">
                    <strong class="has-text-primary-30">Note:</strong> This is a
                    demo version of the app. The full version will be available
                    soon.
                    <br /> The demo version is limited to
                    <strong>10 questions per quiz.</strong>
                </p>
            </CenterColumn>.
        </div>
    </div>
</section>
