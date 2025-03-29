<script lang="ts">
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
    import { SearchIcon, Code } from "lucide-svelte";
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
                    <p class="is-size-1 has-text-weight-bold has-text-centered">
                        Quizbyte
                    </p>
                    <a class="button ml-2" href="https://www.github.com/Ezek-iel/quiz-byte">
                        <span class="icon">
                           <Code/>
                        </span>
                    </a>
                </div>
                <p class="is-size-2 has-text-weight-semibold has-text-centered">
                    What do you want to test yourself on <span
                        class="has-text-primary-30 is-underlined has-text-weight-bold"
                        >today?</span
                    >
                </p>
                <CenterColumn size={8}>
                    <form action="/quiz" class="mt-5">
                        <div class="columns">
                            <div class="column is-9">
                                <div class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <SearchIcon />
                                    </span>
                                    <input
                                        type="text"
                                        class="input"
                                        placeholder="Ask for something"
                                        name="topic"
                                    />
                                </div>
                            </div>
                            <div class="column is-3">
                                <div class="control">
                                    <button
                                        class="button is-primary"
                                        type="submit"
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
                    <strong class="has-text-primary-30">Note:</strong> AI provides helpful suggestions, but it might occasionally err – please double-check the recommendations.
                </p>
            </CenterColumn>.
        </div>
    </div>
</section>
