<script lang="ts">
    import { BoxSelect, Check, Inspect, LucideX } from "lucide-svelte";
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
    import type { Question } from "$lib/types";

    interface Choice {
        selection: number;
        remark?: "Correct" | "Wrong";
    }

    let { data } = $props();

    let score: number = 0;
    let quizLog: Choice[] = $state([]);
    let questions: Question[] = data.question;
    let current: number = $state(1);
    let question: Question = $derived(questions[current - 1]);

    function check(option: number) {
        if (!quizLog[current - 1]) {
            const newAnswer: Choice = {
                selection: option,
            };

            if (option == question.answer){
                newAnswer.remark = "Correct"
                score++;
            }
            else {
                newAnswer.remark = "Wrong"
            }
            quizLog[current - 1] = newAnswer;
        }
    }
</script>

{#snippet optionSnippet(
    text: string,
    id: number,
    isCorrect: boolean = false,
    isWrong: boolean = false,
)}
    <div>
        <CenterColumn size={7}>
            <div
                class="box is-shadowless {isCorrect
                    ? 'has-background-primary-70'
                    : ''}
                    {isWrong ? 'has-background-danger-70' : ''}"
                data-class="option"
            >
                <div class="is-flex is-gap-3 is-align-items-center">
                    <button
                        class="button"
                        disabled={isCorrect || isWrong}
                        onclick={() => {
                            check(id);
                        }}
                    >
                        <span class="icon">
                            {#if isCorrect}
                                <Check />
                            {:else if isWrong}
                                <LucideX />
                            {:else}
                                <BoxSelect />
                            {/if}
                        </span>
                    </button>
                    <p class="is-size-5 has-text-weight-semibold">{text}</p>
                </div>
            </div>
        </CenterColumn>
    </div>
{/snippet}

<section class="hero">
    <div class="hero-body">
        <CenterColumn size={8}>
            <div class="box">
                <div class="content">
                    <h1 class="is-size-2 has-text-centered">
                        Question {current} of {questions.length}
                    </h1>
                    <br />
                    <br />
                    <CenterColumn size={8}>
                        <p class="is-size-5 has-text-centered">
                            {question.questionText}
                        </p>
                    </CenterColumn>
                    <br />
                    <br />

                    {#each question.options as option, index (index)}
                    {@const currentQuestion = quizLog[current - 1]}
                        {#if currentQuestion}
                            {#if question.answer == index}
                                {@render optionSnippet(
                                    option,
                                    index,
                                    true,
                                    false,
                                )}
                            {:else if currentQuestion.remark === "Wrong" && currentQuestion.selection == index}
                                {@render optionSnippet(
                                    option,
                                    index,
                                    false,
                                    true,
                                )}
                            {:else}
                                {@render optionSnippet(option, index)}
                            {/if}
                        {:else}
                            {@render optionSnippet(option, index)}
                        {/if}
                    {/each}
                    {#if quizLog[current - 1]}
                        <p class="is-size-5 has-text-centered">{question.remark}</p>
                    {/if}
                    <div class="mt-6">
                        <CenterColumn size={8}>
                            <div
                                class="is-flex is-justify-content-space-between"
                            >
                                <button
                                    class="button is-medium"
                                    onclick={() => {
                                        current--;
                                    }}
                                    disabled={current == 1}>Previous</button
                                >

                                <button
                                    class="button is-medium is-primary"
                                    onclick={() => {
                                        current++;
                                    }}
                                    disabled={current == questions.length || !Boolean(quizLog[current - 1])}
                                    >Next</button
                                >
                            </div>
                        </CenterColumn>
                    </div>
                </div>
            </div>
        </CenterColumn>
    </div>
</section>

<style>
    button:not(button.button) {
        text-align: start;
    }

    button.button[disabled] {
        cursor: default;
    }

    div[data-class="option"]:hover {
        /* background-color: red; */
        background-color: rgb(224, 224, 224);
        cursor: pointer;
    }
</style>
