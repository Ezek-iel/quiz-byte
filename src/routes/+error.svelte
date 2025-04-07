<script lang="ts">
    import { page } from "$app/state";
</script>

<section class="hero is-fullheight">
    <div class="hero-body">
        <div class="container">
            <p class="is-size-3 has-text-centered">
                {page.status}
                {page.error?.message}
            </p>
            <div class="buttons is-centered mt-3">
                <a href="/" class="button is-light is-primary">Create a Quiz</a>
            </div>
        </div>
    </div>
</section>
