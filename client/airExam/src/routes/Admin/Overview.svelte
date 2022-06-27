<script>
    import { onMount } from "svelte";
    import Flight from "../../components/Flight.svelte";
    import {
        sumBookings,
        sumPlannedFlights,
        sumPassedFlights,
        getNextFlights,
        getLastFlights,
    } from "../../functions/apiCalls";
    let lastFlights = [];
    let nextFlights = [];

    let flightsSoFar = 0;
    let plannedFlights = 0;

    let bookedTickets = 0;

    let lastUpdated;

    onMount(async () => {
        lastUpdated = new Date();
        lastFlights = await getLastFlights();
        nextFlights = await getNextFlights();

        flightsSoFar = await sumPassedFlights();
        plannedFlights = await sumPlannedFlights();

        bookedTickets = await sumBookings();
    });
</script>

<div class="container">
    <div class="d-flex p-2 flex-row justify-content-around align-items-center">
        <div class="d-flex p-2">
            <p>{"Flights we had so far: " + flightsSoFar}</p>
        </div>
        <div class="d-flex p-2">
            <p>{"Planned flights: " + plannedFlights}</p>
        </div>
        <div class="d-flex p-2">
            <p>{"Total amount of booked tickets: " + bookedTickets}</p>
        </div>
    </div>
    <div class="d-flex p-2 flex-row justify-content-between align-items-start">
        <div class="d-flex flex-column p-2">
            <p>Last 10 Flights:</p>
            {#each lastFlights as flight}
                <Flight {flight} admin={true} />
            {/each}
        </div>
        <div class="d-flex flex-column p-2">
            <p>Next 10 Flights:</p>
            {#each nextFlights as flight}
                <Flight {flight} admin={true} />
            {/each}
        </div>
    </div>
    <div>
        <p>
            {"Last updated at: " + lastUpdated}
        </p>
    </div>
</div>

<style>
    p {
        font-size: 20px;
        padding: 10px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }
</style>
