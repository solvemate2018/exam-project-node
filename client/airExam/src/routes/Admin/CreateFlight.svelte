<script>
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { scheduleFlights } from "../../miscellaneous/functions";

    let flight = { origin: "", destination: "", duration: 15 };
    let frequency = "Ones";
    let frequencies = ["Ones", "Ones per week", "Ones per day"];
    let now = new Date(),
        month,
        day,
        year;
    let startingFrom;
    let finishingOn;
    let cities = [];
    let citiesLoaded = false;
    let minDate;
    let maxDate;
    const navigate = useNavigate();
    let twoWay = true;

    onMount(async () => {
        (month = "" + (now.getMonth() + 1)),
            (day = "" + (now.getDate() + 1)),
            (year = now.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        minDate = [year, month, day].join("-") + "T00:00";
        maxDate = [year + 1, month, day].join("-") + "T00:00";
        startingFrom = minDate;

        let response = await fetch(
            "https://countriesnow.space/api/v0.1/countries/population/cities"
        );
        let jsonData = await response.json();
        let data = jsonData.data;
        for (let i = 0; i < data.length; i++) {
            const city = data[i];
            if (city.city != null && city.populationCounts[0].value > 200000) {
                cities.push(city.country + " - " + city.city);
            }
        }
        citiesLoaded = true;
    });

    function cityCheck(city) {
        if (!cities.includes(origin)) {
            city = "";
        }
    }

    function frequencyCheck() {
        if (!frequencies.includes) {
            frequency = "";
        }
    }

    function checkDuration() {
        if (flight.duration > 400) flight.duration = 400;
        else if (flight.duration < 15) flight.duration = 15;
    }

    async function scheduleFlight() {
        const startingOn = new Date(startingFrom);
        const finishing = new Date(finishingOn);
        let result;
        if (twoWay) {
            result = await scheduleFlights(
                flight,
                frequency,
                startingOn,
                finishing
            );
            let destination = flight.destination;
            flight.destination = flight.origin;
            flight.origin = destination;
            startingOn.setTime(
                startingOn.getTime() +
                    (1000 * 60 * 60 + 1000 * 60 * flight.duration)
            );
            result = await scheduleFlights(
                flight,
                frequency,
                startingOn,
                finishing
            );
        } else {
            result = await scheduleFlights(
                flight,
                frequency,
                startingOn,
                finishing
            );
        }
        if (result.msg) {
            alert(result.msg);
            navigate("/");
        } else {
            alert(result.err);
        }
    }
</script>

<div class="container">
    <h1>Schedule Flight</h1>
    <div class="input-group rounded search-line">
        <input
            type="search"
            class="form-control rounded"
            list="cities"
            placeholder="Origin"
            aria-label="Origin"
            aria-describedby="search-addon"
            bind:value={flight.origin}
            on:change={() => cityCheck(flight.origin)}
        />

        <input
            type="search"
            class="form-control rounded"
            list="cities"
            placeholder="Destination"
            aria-label="Destination"
            aria-describedby="search-addon"
            bind:value={flight.destination}
            on:change={() => cityCheck(flight.destination)}
        />

        <input
            type="search"
            class="form-control rounded"
            list="frequencies"
            placeholder="Frequency"
            aria-label="Frequency"
            aria-describedby="search-addon"
            bind:value={frequency}
            on:change={frequencyCheck}
        />
    </div>

    <div class="input-group rounded search-line">
        <label for="duration">Flight duration:</label>
        <input
            class="form-control rounded"
            bind:value={flight.duration}
            on:change={checkDuration}
            type="number"
            max="400"
            min="15"
        />

        <label for="firstFlight">Flight Time:</label>
        <input
            class="form-control rounded"
            type="datetime-local"
            min={minDate}
            max={maxDate}
            id="firstFlight"
            name="firstFlight"
            bind:value={startingFrom}
        />

        {#if frequency != "Ones"}
            <label for="repeatUntil">Repeat until:</label>
            <input
                class="form-control rounded"
                type="date"
                min={startingFrom.split("T")[0]}
                max={startingFrom
                    .split("T")[0]
                    .replace(
                        startingFrom.split("T")[0].split("-")[0],
                        parseInt(startingFrom.split("T")[0].split("-")[0]) + 1
                    )}
                bind:value={finishingOn}
                id="repeatUntil"
                name="repeatUntil"
            />
        {/if}
        <input
            type="checkbox"
            bind:checked={twoWay}
            id="twoWay"
            name="twoWay"
        />
        <label for="twoWay">Two way flights?</label>
        <button class="button" on:click={scheduleFlight}
            ><p class="button-text">Schedule Flight</p></button
        >
    </div>
    <datalist id="cities">
        {#if citiesLoaded}
            {#each cities as city}
                <option value={city} />
            {/each}
        {/if}
    </datalist>

    <datalist id="frequencies">
        {#each frequencies as freq}
            <option value={freq} />
        {/each}
    </datalist>
</div>

<style>
    h1 {
        font-size: 40px;
        padding: 10px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }
    .button {
        width: 6vw;
        height: 4vh;
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
    label {
        color: #748da6;
        font-size: 22px;
    }
    #twoWay {
        height: 35px;
        width: 22px;
    }
    .search-line {
        margin-top: 20px;
    }
</style>
