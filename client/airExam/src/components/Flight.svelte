<script>
    import { inboundFlight, outboundFlight } from "../stores/flight";
    import { getDayOfTheWeek, getMonth } from "../miscellaneous/functions.js";
    export let flight;
    export let selected = false;
    export let inbound = true;
    export let admin = false;
    const takeOff = new Date(flight.takeOff);
    function selectFlight() {
        if (inbound) inboundFlight.set(flight);
        else outboundFlight.set(flight);
    }

    function deselectFlight() {
        if (inbound) inboundFlight.set({});
        else outboundFlight.set({});
    }
</script>

<div class="flight-container">
    <div class="flight-info">
        <p class="flight-date">
            {getDayOfTheWeek(takeOff.getDay()) +
                " " +
                takeOff.getDate() +
                " " +
                getMonth(takeOff.getMonth())}
        </p>
        <p class="flight-course">
            {flight.takeOff.split("T")[1].slice(0, 5) +
                " " +
                flight.origin +
                " "}<i class="fa-solid fa-plane-departure" />
            {" -> " +
                Math.floor(flight.duration / 60) +
                "h " +
                (flight.duration % 60) +
                "m "} <i class="fa-solid fa-plane" />
            {" -> " +
                flight.landing.split("T")[1].slice(0, 5) +
                " " +
                flight.destination +
                " "}<i class="fa-solid fa-plane-arrival" />
        </p>
    </div>
    {#if !admin}
        {#if !selected}
            <div class="controls">
                <button type="button" class="button" on:click={selectFlight}
                    >Select</button
                >
            </div>
        {:else}
            <div class="controls">
                <button type="button" class="button" on:click={deselectFlight}
                    >Deselect</button
                >
            </div>
        {/if}
    {/if}
</div>

<style>
    .flight-container {
        background-color: #748da6;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px;
        height: 10vh;
        margin: 30px;
    }
    .flight-info {
        flex: 5;
        padding-left: 1vw;
    }
    .controls {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    i {
        color: #f2d7d9;
    }
    .flight-date {
        font-size: 16px;
        margin: 0;
        color: #f2d7d9;
    }
    .flight-course {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
        color: #f2d7d9;
    }
    .button {
        width: 4vw;
        height: 4vh;
        background-color: #f2d7d9;
        border-radius: 6px;
        border: 0px;
        align-items: center;
        justify-content: center;
    }
</style>
