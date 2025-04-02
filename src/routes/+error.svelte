<script lang="ts">
    import {page} from "$app/state";
    import CenterColumn from "$lib/shared/CenterColumn.svelte";
</script>


<section class="hero is-fullheight">
    <div class="hero-body">
        <div class="container">
            <CenterColumn size={8}>
                <p class="has-text-centered is-size-2">{page.status}</p>
                <p class="has-text-centered is-size-4">{page.error!.message}</p>
                <div class="buttons is-centered">
                    <a href="/" class="button is-primary is-light mt-2">Go Home</a>
                </div>
            </CenterColumn>
        </div>
    </div>
</section>