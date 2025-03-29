<section class="hero is-fullheight is-primary">
    <div class="hero-body">
        <div
            class="container is-flex is-flex-direction-column is-align-items-center"
        >
        <span data-class="loader"></span>
        </div>
    </div>
</section>

<style>
    [data-class="loader"] {
        position: relative;
        width: 324px;
        display: flex;
        justify-content: space-between;
    }
    [data-class="loader"]::after,
    [data-class="loader"]::before {
        content: "";
        display: inline-block;
        width: 144px;
        height: 144px;
        background-color: #fff;
        background-image: radial-gradient(
            circle 52px,
            #0d161b 100%,
            transparent 0
        );
        background-repeat: no-repeat;
        border-radius: 50%;
        animation:
            eyeMove 10s infinite,
            blink 10s infinite;
    }
    @keyframes eyeMove {
        0%,
        10% {
            background-position: 0px 0px;
        }
        13%,
        40% {
            background-position: -45px 0px;
        }
        43%,
        70% {
            background-position: 45px 0px;
        }
        73%,
        90% {
            background-position: 0px 45px;
        }
        93%,
        100% {
            background-position: 0px 0px;
        }
    }
    @keyframes blink {
        0%,
        10%,
        12%,
        20%,
        22%,
        40%,
        42%,
        60%,
        62%,
        70%,
        72%,
        90%,
        92%,
        98%,
        100% {
            height: 144px;
        }
        11%,
        21%,
        41%,
        61%,
        71%,
        91%,
        99% {
            height: 54px;
        }
    }
</style>
