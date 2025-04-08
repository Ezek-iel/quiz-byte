<script lang="ts">
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
    import { SearchIcon } from "lucide-svelte";
    import { enhance } from "$app/forms";

    let isLoading = $state(false);
    let topic = $state("");
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
                <p class="is-size-3 has-text-weight-semibold has-text-centered">
                    What do you want to <span
                        class="has-text-primary-30 is-underlined has-text-weight-bold"
                        >test yourself on?</span
                    >
                </p>
                <CenterColumn size={8}>
                    <form
                        action="/create"
                        class="mt-5"
                        method="POST"
                        use:enhance
                    >
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
                                        bind:value={topic}
                                    />
                                </div>
                            </div>
                            <div class="column is-3">
                                <div class="control">
                                    <button
                                        class="button is-primary {isLoading
                                            ? 'is-loading'
                                            : ''}"
                                        type="submit"
                                        disabled={!topic}
                                        onclick={() => {
                                            isLoading = true;
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
                <!-- <p class="is-size-6 has-text-centered mb-3"><a href="/quiz" class="has-text-primary-20 has-text-weight-bold is-underlined">View Created Quizzes</a></p> -->
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
