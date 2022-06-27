<script>
    import { inboundFlight, outboundFlight } from "../stores/flight";
    import { getDayOfTheWeek, getMonth } from "../miscellaneous/functions";
    let inboundTakeOff = new Date($inboundFlight.takeOff);
    let outboundTakeOff = new Date($outboundFlight.takeOff);
</script>

<div class="flight-info">
    <p class="flight-course">INBOUND FLIGHT</p>
    <p class="flight-date">
        {getDayOfTheWeek(inboundTakeOff.getDay()) +
            " " +
            inboundTakeOff.getDate() +
            " " +
            getMonth(inboundTakeOff.getMonth())}
    </p>
    <p class="flight-course">
        {$inboundFlight.takeOff.split("T")[1].slice(0, 5) +
            " " +
            $inboundFlight.origin +
            " "}<i class="fa-solid fa-plane-departure" />
        {" -> " +
            Math.floor($inboundFlight.duration / 60) +
            "h " +
            ($inboundFlight.duration % 60) +
            "m "} <i class="fa-solid fa-plane" />
        {" -> " +
            $inboundFlight.landing.split("T")[1].slice(0, 5) +
            " " +
            $inboundFlight.destination +
            " "}<i class="fa-solid fa-plane-arrival" />
    </p>
</div>
<div class="flight-info">
    <p class="flight-course">OUTBOUND FLIGHT</p>
    <p class="flight-date">
        {getDayOfTheWeek(outboundTakeOff.getDay()) +
            " " +
            outboundTakeOff.getDate() +
            " " +
            getMonth(outboundTakeOff.getMonth())}
    </p>
    <p class="flight-course">
        {$outboundFlight.takeOff.split("T")[1].slice(0, 5) +
            " " +
            $outboundFlight.origin +
            " "}<i class="fa-solid fa-plane-departure" />
        {" -> " +
            Math.floor($outboundFlight.duration / 60) +
            "h " +
            ($outboundFlight.duration % 60) +
            "m "} <i class="fa-solid fa-plane" />
        {" -> " +
            $outboundFlight.landing.split("T")[1].slice(0, 5) +
            " " +
            $outboundFlight.destination +
            " "}<i class="fa-solid fa-plane-arrival" />
    </p>
</div>

<style>
    .flight-info {
        background-color: #748da6;
        border-radius: 10px;
        margin: 20px;
        width: fit-content;
    }
    i {
        color: #f2d7d9;
    }
    .flight-date {
        font-size: 20px;
        font-weight: bold;
        margin-left: 30px;
        margin-bottom: 0px;
        color: #f2d7d9;
    }
    .flight-course {
        font-size: 20px;
        font-weight: bold;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 0px;
        padding-bottom: 10px;
        padding-top: 10px;
        color: #f2d7d9;
    }
</style>
