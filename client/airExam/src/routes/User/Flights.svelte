<script>
    import { onMount } from "svelte";
    import { inboundFlight, outboundFlight } from "../../stores/flight";
    import { useNavigate } from "svelte-navigator";
    import { pastDate, futureDate } from "../../functions/functions.js";
    import { fetchFlights } from "../../functions/apiCalls.js";
    import Flight from "../../components/Flight.svelte";
    import { passengers } from "../../stores/passengers";

    let routes = [];
    let origin = "";
    let destination = "";
    let now = new Date(),
        month,
        day,
        year;
    let departureString;
    let returnString;
    let minDate;
    let maxDate;
    let inboundFlights = [];
    const navigate = useNavigate();
    let outboundFlights = [];
    let searchedForInboundFlights = false;
    let searchedOutboundFlights = false;

    onMount(async () => {
        (month = "" + (now.getMonth() + 1)),
            (day = "" + now.getDate()),
            (year = now.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        minDate = [year, month, day].join("-");
        maxDate = [year + 1, month, day].join("-");
        departureString = [year, month, day].join("-");
        returnString = [year, month, day].join("-");
        routes = await fetch("http://localhost:8000/flight/routes").then(
            (response) => response.json()
        );

        origin = "";
        destination = "";
        inboundFlight.set({});
        outboundFlight.set({});
        passengers.set([]);
    });

    async function searchInboundFlights() {
        inboundFlight.set({});
        outboundFlight.set({});
        let startDate = pastDate(departureString, 5);
        let finishDate;
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        if (startDate.getDate() == tomorrow.getDate()) {
            finishDate = futureDate(
                new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate(),
                10
            );
        } else {
            finishDate = futureDate(departureString, 5);
        }

        inboundFlights = await fetchFlights(
            origin,
            destination,
            startDate,
            finishDate
        );
        searchedForInboundFlights = true;
    }

    async function searchOutboundFlights() {
        outboundFlight.set({});

        let startDate = pastDate(returnString, 5);
        let finishDate;
        let minStartDate = new Date($inboundFlight.landing);
        if (minStartDate.getTime() > startDate.getTime()) {
            finishDate = futureDate(
                minStartDate.getFullYear() +
                    "-" +
                    (minStartDate.getMonth() + 1) +
                    "-" +
                    minStartDate.getDate(),
                10
            );
            startDate = minStartDate;
        } else {
            finishDate = futureDate(returnString, 5);
        }

        outboundFlights = await fetchFlights(
            destination,
            origin,
            startDate,
            finishDate
        );
        searchedOutboundFlights = true;
        return "";
    }

    function originCheck() {
        if (!routes.map((route) => route.origin).includes(origin)) {
            origin = "";
        }
    }

    function destinationCheck() {
        if (
            !routes.find(
                (route) =>
                    route.origin == origin && route.destination == destination
            )
        ) {
            destination = "";
        }
    }
</script>

<div class="container">
    <h1>Search Flights</h1>
    <div class="input-group rounded">
        <input
            type="search"
            class="form-control rounded"
            list="origins"
            placeholder="Origin"
            aria-label="Origin"
            aria-describedby="search-addon"
            bind:value={origin}
            on:change={originCheck}
        />
        <input
            type="search"
            class="form-control rounded"
            list="destinations"
            placeholder="Destination"
            aria-label="Destination"
            aria-describedby="search-addon"
            bind:value={destination}
            on:change={destinationCheck}
        />
        <label for="departDate">Depart: </label>
        <input
            id="departDate"
            type="date"
            class="form-control rounded"
            placeholder="Depart"
            aria-label="Depart"
            aria-describedby="search-addon"
            min={minDate}
            max={maxDate}
            bind:value={departureString}
        />
        <label for="returnDate">Return:</label>
        <input
            id="returnDate"
            type="date"
            class="form-control rounded"
            placeholder="Return"
            aria-label="Return"
            aria-describedby="search-addon"
            min={departureString}
            max={maxDate}
            bind:value={returnString}
        />
        <button class="button" on:click={searchInboundFlights}
            ><p class="button-text">Search Flights</p></button
        >

        <datalist id="origins">
            {#each routes as route}
                <option value={route.origin} />
            {/each}
        </datalist>

        <datalist id="destinations">
            {#each routes as route}
                {#if route.origin == origin}
                    <option value={route.destination} />
                {/if}
            {/each}
        </datalist>
    </div>
    <br />
    <div class="content">
        {#if $inboundFlight.origin != null}
            <div class="d-flex p-2 align-items-center">
                <i class="fa-solid fa-plane-departure" />
                <h4>Selected Inbound Flight</h4>
            </div>
            <Flight flight={$inboundFlight} selected={true} />
            {#if $outboundFlight.origin != null}
                <div class="d-flex p-2 align-items-center">
                    <i class="fa-solid fa-plane-departure" />
                    <h4>Selected Return Flight</h4>
                </div>
                <Flight
                    flight={$outboundFlight}
                    inbound={false}
                    selected={true}
                />
                <br />
                <button
                    on:click={() => navigate("/addPassengers")}
                    type="button button-link"
                    class="button"
                    ><p class="button-text">Add Passengers</p></button
                >
                <p />
            {:else if searchedOutboundFlights == false}
                {searchOutboundFlights()}
            {:else if outboundFlights[0] != null}
                <div class="d-flex p-2 align-items-center">
                    <i class="fa-solid fa-plane-departure" />
                    <h4>{destination + " to " + origin}</h4>
                </div>
                <ul>
                    {#each outboundFlights as flight}
                        <Flight {flight} inbound={false} />
                    {/each}
                </ul>
            {:else}
                <p class="errorMsg">
                    There are no return flights for the date you selected!
                    Please search for flights again
                </p>
            {/if}
        {:else if searchedForInboundFlights && inboundFlights[0] != null}
            <div class="d-flex p-2 align-items-center">
                <i class="fa-solid fa-plane-departure" />
                <h4>{origin + " to " + destination}</h4>
            </div>
            <ul>
                {#each inboundFlights as flight}
                    <Flight {flight} />
                {/each}
            </ul>
        {:else if searchedForInboundFlights && inboundFlights[0] == null}
            <p class="errorMsg">
                The are no inbound Flights around the current date! Please try
                another one!
            </p>
        {/if}
    </div>
</div>

<style>
    h1 {
        font-size: 40px;
        padding: 10px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }

    h4 {
        padding-left: 3px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }
    label {
        color: #748da6;
        font-size: 22px;
    }
    i {
        color: #748da6;
    }
    .button {
        width: 6vw;
        height: 5vh;
        background-color: #748da6;
        border-radius: 6px;
        border: 0px;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    .button-text {
        color: #f2d7d9;
        margin: 0px;
    }
    .errorMsg {
        color: red;
    }
</style>
