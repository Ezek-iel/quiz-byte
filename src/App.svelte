<script lang="ts">
  import { SearchIcon } from "lucide-svelte";
  import { generate, parse, type History } from "./utils";
  import Intro from "./lib/Intro.svelte";

  let inputElement: HTMLInputElement;
  let userInput = $state("");

  const history: Array<History> = $state([]);

  async function generateText() {
    history.push({ sender: "User", message: userInput });
    inputElement.value = "";
    const result = await generate(userInput);
    history.push({ sender: "AI", message: result });
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
      {#each history as { sender, message }, index}
        <div class="columns">
          <div class="column {sender === 'User' ? 'is-5 is-offset-7' : 'is-8'}">
            <div class={sender === "User" ? "box" : ""}>
              <div class="content">{@html parse(message)}</div>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <Intro />
    {/if}
  </section>
</div>

<div class="columns is-centered" id="ask">
  <div class="column is-8">
    <div class="box is-flex is-gap-1 is-align-items-flex-start" id="search-box">
      <input
        bind:this={inputElement}
        class="input is-large"
        placeholder="Learn something"
        bind:value={userInput}
      />
      <button
        class="button is-primary is-large has-radius-rounded ml-2"
        disabled={!userInput}
        onclick={generateText}
      >
        <span class="icon">
          <SearchIcon />
        </span>
      </button>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

  * {
    font-family: "Ubuntu", sans-serif;
  }

  div#report {
    height: 88vh;
    overflow-y: auto;
    scrollbar-color: inherit transparent;
  }
</style>
