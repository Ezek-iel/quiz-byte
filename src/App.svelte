<script lang="ts">
  import { SearchIcon } from "lucide-svelte";
  import { generate, parse, type History, type Prompt } from "./utils";
  import Intro from "./lib/Intro.svelte";

  let question = $state("");
  let simplicity: "Simple" | "Normal" | "Complicated" = $state("Normal");
  let isLoading = $state(false);
  const history: Array<History> = $state([]);

  let response = $state("");

  //TODO - Scroll down to the bottom on generateText
  async function generateText() {
    isLoading = true;
    let userInput: Prompt = {
      question,
      simplicity,
      isUnderstood: false,
    };

    history.push({ sender: "User", message: userInput });
    question = "";
    response = await generate(userInput);
    isLoading = false;
    history.push({ sender: "AI", message: response });
  }

  function setSimplicity(value: "Simple" | "Normal" | "Complicated") {
    // You can just set simplicity directly
    simplicity = value;
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      generateText();
    }
  });
</script>

<div id="report">
  <section class="section">
    {#if history.length > 0}
      {#each history as { sender, message }, _ (_)}
        <div class="columns">
          {#if sender === "AI"}
            {@const formattedResponse = JSON.parse(message as string)}
            <div class="column is-8">
              <div class="content">
                {@html parse(formattedResponse.answer)}
              </div>
              {#each formattedResponse["follow-up"] as followUp}
                <div class="buttons">
                  <button
                    class="button is-rounded"
                    onclick={() => {
                      question = followUp;
                      generateText();
                    }}
                  >
                    {followUp}
                  </button>
                </div>
              {/each}
            </div>
          {:else}
            {@const question = message as Prompt}
            <div class="column is-5 is-offset-7">
              <div class="box">
                <div class="content">
                  {@html parse(question.question)}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
      {#if isLoading}
        <div class="column is-8">
          <div class="skeleton-lines">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      {/if}
    {:else}
      <Intro />
    {/if}
  </section>
</div>

<div class="columns is-centered pt-3 px-2" id="ask">
  <div class="column is-7">
    <div class="is-flex is-gap-1 is-align-items-flex-start" id="search-box">
      <input
        class="input is-medium"
        placeholder="Learn something"
        bind:value={question}
      />
      <button
        class="button is-primary is-medium has-radius-rounded ml-2"
        disabled={!question}
        onclick={generateText}
      >
        <span class="icon">
          <SearchIcon />
        </span>
      </button>
    </div>
    <div class="buttons mt-4">
      <button
        class="button is-rounded is-primary {simplicity === 'Simple'
          ? ''
          : 'is-outlined'}"
        onclick={() => {
          setSimplicity("Simple");
        }}>Simple</button
      >
      <button
        class="button is-rounded is-primary {simplicity === 'Normal'
          ? ''
          : 'is-outlined'}"
        onclick={() => {
          setSimplicity("Normal");
        }}>Normal</button
      >
      <button
        class="button is-rounded is-primary {simplicity === 'Complicated'
          ? ''
          : 'is-outlined'}"
        onclick={() => {
          setSimplicity("Complicated");
        }}>Complicated</button
      >
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

  * {
    font-family: "Ubuntu", sans-serif;
  }

  div#report {
    height: 85vh;
    overflow-y: auto;
    scrollbar-color: lightgrey transparent;
  }

  button {
    display: inline;
  }
</style>
