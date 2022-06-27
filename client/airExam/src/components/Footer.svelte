<script>
    let numberOfPassedFlights = "";
    import io from "socket.io-client";
    const socket = io();

    socket.on("updatePassedFlights", ({ passedFlights }) => {
        numberOfPassedFlights = passedFlights;
    });
</script>

<!-- Footer -->
<footer class="footer">
    <div class="d-flex justify-content-around align-items-center footer">
        <div class="d-flex justify-content-around align-items-center">
            <p>{"Flights so far: " + numberOfPassedFlights}</p>
        </div>
        <div class="d-flex justify-content-around align-items-center">
            <p>© 2022 Copyright: Georgi Dimitrov</p>
        </div>
    </div>
</footer>

<style>
    .footer {
        height: 6vh;
        background-color: #748da6;
    }
    p {
        font-size: 18px;
        color: white;
        padding-top: 1.5vh;
    }
</style>
