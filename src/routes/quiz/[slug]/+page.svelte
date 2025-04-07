<script lang="ts">
    import { BoxSelect, Check, LucideX } from "lucide-svelte";
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
    import LoadingState from "$lib/shared/LoadingState.svelte";
    import type { Question } from "$lib/utils/types";
    import { generateContent } from "$lib/utils/ai";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Result from "$lib/shared/Result.svelte";

    interface Choice {
        selection: number;
        remark?: "Correct" | "Wrong";
    }

    let { data } = $props();
    let isLoading = $state(true)

    let questions: Question[] = $state([]);
    $inspect(questions).with(function (type, value) {
        console.log(type);
        console.table(value);
    });

    onMount(() => {
        generateContent(data.topic).then((result) => {
            console.log(result);
            isLoading = false;
            questions = JSON.parse(result) as Question[];
        });
    });

    let score: number = $state(0);
    let quizLog: Choice[] = $state([]);
    let current: number = $state(1);
    let question: Question = $derived(questions[current - 1]);
    let isDone: boolean = $state(false);

    function check(option: number) {
        if (!quizLog[current - 1]) {
            const newAnswer: Choice = {
                selection: option,
            };

            if (option == question.answer) {
                newAnswer.remark = "Correct";
                score++;
            } else {
                newAnswer.remark = "Wrong";
            }
            quizLog.push(newAnswer);
        }
    }
</script>
<!--TODO This component can be refactored better and shorter   -->
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
                    ? 'has-background-success-70'
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

{#if isLoading}
    <LoadingState />
{:else if isDone}
    <Result {score} {questions} />
{:else}
    <section class="hero">
        <div class="hero-body">
            <CenterColumn size={8}>
                <div class="box" in:fly={{ y: 20 }}>
                    <div class="content">
                        <h1 class="is-size-3 has-text-centered">
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
                            <p class="is-size-5 has-text-centered">
                                {question.remark}
                            </p>
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
                                        onclick={
                                            function (e){
                                                if (current == questions.length) {
                                                    isDone = true;
                                                } else {
                                                    current++;
                                                }
                                            }
                                        }
                                        disabled={!quizLog[current - 1]}>
                                        Next</button>
                                </div>
                            </CenterColumn>
                        </div>
                    </div>
                </div>
            </CenterColumn>
        </div>
    </section>
{/if}

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
