<script>
    import { useNavigate } from "svelte-navigator";
    import { inboundFlight, outboundFlight } from "../../stores/flight";
    import { passagers } from "../../stores/passagers";
    import { bookFlightTickets } from "../../miscellaneous/functions";
    import RouteInfo from "../../components/RouteInfo.svelte";
    const navigate = useNavigate();

    async function bookTickets() {
        let somethingWrong = false;
        $passagers.forEach(async (passager) => {
            if (
                (await bookFlightTickets(
                    passager,
                    passager.inboundSeat,
                    $inboundFlight.id
                )) != "Succesfully created"
            ) {
                somethingWrong = true;
            }
            if (
                (await bookFlightTickets(
                    passager,
                    passager.outboundSeat,
                    $outboundFlight.id
                )) != "Succesfully created"
            ) {
                somethingWrong = true;
            }
        });
        if (somethingWrong) {
            alert(
                "Something went wrong, please try again later or contact support!"
            );
        } else {
            alert("Congrats you have new tickets!");
        }
        navigate("/");
    }
</script>

<div class="container">
    <RouteInfo />
    <h3>Inbound Flight</h3>
    {#each $passagers as passager}
        <h4>
            {passager.firstName +
                " " +
                passager.lastName +
                " Row: " +
                passager.inboundSeat.row +
                " Seat: " +
                passager.inboundSeat.seat}
        </h4>
    {/each}
    <h3>Outbound Flight</h3>
    {#each $passagers as passager}
        <h4>
            {passager.firstName +
                " " +
                passager.lastName +
                " Row: " +
                passager.outboundSeat.row +
                " Seat: " +
                passager.outboundSeat.seat}
        </h4>
    {/each}
    <button on:click={bookTickets} type="button" class="button"
        ><p class="button-text">Book the tickets</p></button
    >
</div>

<style>
    .button {
        width: 10vw;
        height: 4vh;
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
    h4,
    h3 {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
    }
</style>
