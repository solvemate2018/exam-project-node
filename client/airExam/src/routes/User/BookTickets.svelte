<script>
    import { inboundFlight, outboundFlight } from "../../stores/flight";
    import { passengers } from "../../stores/passengers";
    import { useNavigate } from "svelte-navigator";
    import RouteInfo from "../../components/RouteInfo.svelte";

    import {
        getNumberOfUniqueValues,
        getCookie,
    } from "../../functions/functions";
    import { getSeatAvailabilities } from "../../functions/apiCalls";
    import { onMount } from "svelte";

    let inboundTickets = [];
    let inboundRows = 0;
    let inboundSeats = 0;
    let outboundTickets = [];
    let outboundRows = 0;
    let outboundSeats = 0;
    let selectedTickets = 0;
    const navigate = useNavigate();

    onMount(async () => {
        inboundTickets = await getSeatAvailabilities($inboundFlight.id);
        outboundTickets = await getSeatAvailabilities($outboundFlight.id);

        inboundRows = await getNumberOfUniqueValues(
            inboundTickets.map((ticket) => ticket.row)
        );
        inboundSeats = await getNumberOfUniqueValues(
            inboundTickets.map((ticket) => ticket.seat)
        );
        outboundRows = await getNumberOfUniqueValues(
            outboundTickets.map((ticket) => ticket.row)
        );
        outboundSeats = await getNumberOfUniqueValues(
            outboundTickets.map((ticket) => ticket.seat)
        );

        let restoredPassengers = $passengers;
        restoredPassengers.map((pass) => {
            pass.inboundSeat = undefined;
            pass.outboundSeat = undefined;
        });
    });

    function selectSeat(index) {
        let edittedPassengers = $passengers;
        if (selectedTickets < $passengers.length) {
            edittedPassengers[selectedTickets].inboundSeat =
                inboundTickets[index];
            inboundTickets[index].selected = true;
        } else {
            edittedPassengers[
                selectedTickets - $passengers.length
            ].outboundSeat = outboundTickets[index];
            outboundTickets[index].selected = true;
        }

        passengers.set(edittedPassengers);

        selectedTickets++;
    }

    function removeOutboundSeats() {
        selectedTickets = $passengers.length;
        let edittedPassengers = $passengers;

        edittedPassengers.forEach((passenger) => {
            passenger.outboundSeat = undefined;
        });
        outboundTickets.forEach((seat) => {
            seat.selected = false;
        });
        passengers.set(edittedPassengers);
    }

    function removeInboundSeats() {
        selectedTickets = 0;
        let edittedPassengers = $passengers;

        edittedPassengers.forEach((passenger) => {
            passenger.inboundSeat = undefined;
            passenger.outboundSeat = undefined;
        });
        inboundTickets.forEach((seat) => {
            seat.selected = false;
        });
        outboundTickets.forEach((seat) => {
            seat.selected = false;
        });
        passengers.set(edittedPassengers);
    }
</script>

<div class="container">
    <RouteInfo />
    {#each $passengers as passenger}
        {#if selectedTickets - $passengers.length > $passengers.indexOf(passenger)}
            <h4>
                {"Passenger " +
                    ($passengers.indexOf(passenger) + 1) +
                    " - " +
                    passenger.firstName +
                    " " +
                    passenger.lastName +
                    ", Inbound Seat: Row:" +
                    passenger.inboundSeat.row +
                    " Seat:" +
                    passenger.inboundSeat.seat +
                    ", Outbound Seat: Row:" +
                    passenger.outboundSeat.row +
                    " Seat:" +
                    passenger.outboundSeat.seat}
            </h4>
        {:else if selectedTickets > $passengers.indexOf(passenger)}
            <h4>
                {"Passenger " +
                    ($passengers.indexOf(passenger) + 1) +
                    " - " +
                    passenger.firstName +
                    " " +
                    passenger.lastName +
                    ", Inbound Seat: Row:" +
                    passenger.inboundSeat.row +
                    " Seat:" +
                    passenger.inboundSeat.seat}
            </h4>
        {:else}
            <h4>
                {"Passenger " +
                    ($passengers.indexOf(passenger) + 1) +
                    " - " +
                    passenger.firstName +
                    " " +
                    passenger.lastName}
            </h4>
        {/if}
    {/each}
    {#if selectedTickets > $passengers.length}
        <button on:click={removeOutboundSeats} type="button" class="button"
            ><p class="button-text">Change Outbound seats</p></button
        >
    {:else if selectedTickets > 0 && selectedTickets <= $passengers.length}
        <button on:click={removeInboundSeats} type="button" class="button"
            ><p class="button-text">Change Inbound seats</p></button
        >
    {/if}
    {#if selectedTickets < $passengers.length}
        <h4>Inbound Flight Seats:</h4>
        <div class="seat-selector">
            {#each Array(inboundRows) as _, row (row)}
                <ul>
                    <p style="display: inline;">{row + 1}</p>
                    {#each Array(inboundSeats) as _, seat (seat)}
                        <li style="display:inline">
                            {#if inboundTickets[row * inboundSeats + seat].hasOwnProperty("selected") && inboundTickets[row * inboundSeats + seat].selected == true}
                                <button class="seat selected">{seat + 1}</button
                                >
                            {:else if inboundTickets[row * inboundSeats + seat].available == false}
                                <button class="seat unavailable"
                                    >{seat + 1}</button
                                >
                            {:else}
                                <button
                                    class="seat available"
                                    on:click={() =>
                                        selectSeat(row * inboundSeats + seat)}
                                    >{seat + 1}</button
                                >
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    {:else if selectedTickets < $passengers.length * 2}
        <h4>Outbound Flight Seats:</h4>
        <div class="seat-selector">
            {#each Array(outboundRows) as _, row (row)}
                <ul>
                    <p style="display: inline;">{row + 1}</p>
                    {#each Array(outboundSeats) as _, seat (seat)}
                        <li style="display:inline">
                            {#if outboundTickets[row * outboundSeats + seat].hasOwnProperty("selected") && outboundTickets[row * outboundSeats + seat].selected == true}
                                <button class="seat selected">{seat + 1}</button
                                >
                            {:else if outboundTickets[row * outboundSeats + seat].available == false}
                                <button class="seat unavailable"
                                    >{seat + 1}</button
                                >
                            {:else}
                                <button
                                    class="seat available"
                                    on:click={() =>
                                        selectSeat(row * outboundSeats + seat)}
                                    >{seat + 1}</button
                                >
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    {/if}
    {#if selectedTickets == $passengers.length * 2 && getCookie("loggedIn") == "true"}
        <button
            on:click={() => navigate("/confirmReservation")}
            type="button"
            class="button"
            ><p class="button-text">Confirm reservation</p></button
        >
    {:else if selectedTickets == $passengers.length * 2 && getCookie("loggedIn") != "true"}
        <button on:click={() => navigate("/login")} type="button" class="button"
            ><p class="button-text">Confirm reservation</p></button
        >
    {/if}
</div>

<style>
    h4 {
        margin: 10px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }
    .button {
        width: 10vw;
        height: 5vh;
        background-color: #748da6;
        border-radius: 6px;
        border: 0px;
        align-items: center;
        justify-content: center;
        display: flex;
        margin: 20px;
    }
    .button-text {
        color: #f2d7d9;
        margin: 0px;
    }
    .seat {
        height: 40px;
        width: 40px;
        margin-bottom: 4px;
        margin-top: 4px;
        margin-right: 10px;
        margin-left: 10px;
        border-radius: 8px;
        border: 0px;
    }

    .selected {
        background-color: yellowgreen;
    }

    .available {
        background-color: green;
    }

    .unavailable {
        background-color: red;
    }
    .seat-selector {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
