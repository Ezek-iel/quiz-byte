<script lang="ts">
    import CenterColumn from "./CenterColumn.svelte";
    import { fly } from "svelte/transition";
    import {type Question} from "$lib/types";
    
    const {score, questions}: {score: number, questions: Question[]} = $props();
</script>


<section class="hero is-large">
    <div class="hero-body">
        <div class="container">
            <CenterColumn size={8}>
                <div
                    class="box is-flex is-flex-direction-column is-align-items-center"
                    in:fly={{ y: 20 }}
                >
                    <p class="is-size-3 has-text-weight-semibold mt-1">
                        Here is your result
                    </p>
                    <p class="is-size-1"><span class="has-text-primary-30 has-text-weight-semibold">{score}</span> out of 10</p>
                    <div class="mt-4">
                        {#each questions as question, index (index)}
                            <p class="is-size-5 has-text-primary-20 has-text-weight-semibold">{question.questionText}</p>
                            <p>{question.options[question.answer]}</p>
                            {#if index < (questions.length - 1)}
                                <hr class="has-background-primary-30" />
                            {/if}
                        {/each}
                    </div>
                    <p class="is-size-4 mt-6">Ready for another <a href="/" class="is-underlined">quiz?</a></p>
                </div>
            </CenterColumn>
            
        </div>
    </div>
</section>
