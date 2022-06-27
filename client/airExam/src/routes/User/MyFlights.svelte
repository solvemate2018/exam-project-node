<script>
    import { onMount } from "svelte";
    import { getDayOfTheWeek, getMonth } from "../../functions/functions";
    import {
        fetchTicketsForUser,
        fetchFlightById,
        fetchPassengerById,
    } from "../../functions/apiCalls";
    let flights = [];
    let tickets = [];
    let dataPrepared = false;

    onMount(async () => {
        tickets = await fetchTicketsForUser();

        tickets = await Promise.all(
            tickets.map(async (ticket) => {
                ticket.passenger = await fetchPassengerById(ticket.PassengerId);
                return ticket;
            })
        );

        for (let i = 0; i < tickets.length; i++) {
            if (
                !(await flights.find(
                    (flight) => flight.id == tickets[i].FlightId
                ))
            ) {
                flights.push({
                    id: tickets[i].FlightId,
                    flight: await fetchFlightById(tickets[i].FlightId),
                    tickets: [tickets[i]],
                });
            } else {
                await flights
                    .find((flight) => flight.id == tickets[i].FlightId)
                    .tickets.push(tickets[i]);
            }
        }

        dataPrepared = true;
    });
</script>

<div class="container">
    <h1>My Flights</h1>
    {#if dataPrepared}
        {#each flights as flight}
            <div class="flight-container">
                <div class="flight-info">
                    <p class="flight-date">
                        {getDayOfTheWeek(
                            new Date(flight.flight.takeOff).getDay()
                        ) +
                            " " +
                            new Date(flight.flight.takeOff).getDate() +
                            " " +
                            getMonth(
                                new Date(flight.flight.takeOff).getMonth()
                            )}
                    </p>
                    <p class="flight-course">
                        {flight.flight.takeOff.split("T")[1].slice(0, 5) +
                            " " +
                            flight.flight.origin +
                            " "}<i class="fa-solid fa-plane-departure" />
                        {" -> " +
                            Math.floor(flight.flight.duration / 60) +
                            "h " +
                            (flight.flight.duration % 60) +
                            "m "} <i class="fa-solid fa-plane" />
                        {" -> " +
                            flight.flight.landing.split("T")[1].slice(0, 5) +
                            " " +
                            flight.flight.destination +
                            " "}<i class="fa-solid fa-plane-arrival" />
                    </p>
                </div>
                <div class="passengers">
                    {#each flight.tickets as ticket}
                        <div class="passenger">
                            <p class="flight-course">
                                {ticket.passenger.firstName +
                                    " " +
                                    ticket.passenger.lastName}
                            </p>
                            <p class="flight-course">
                                {ticket.passenger.documentType +
                                    ": " +
                                    ticket.passenger.documentId}
                            </p>
                            <p class="flight-course">
                                {"Row: " +
                                    ticket.ticket_row +
                                    " Seat: " +
                                    ticket.ticket_seat}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    {:else}
        {"Still loading"}
    {/if}
</div>

<style>
    h1 {
        font-size: 40px;
        padding: 10px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        color: #748da6;
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
    .flight-container {
        background-color: #748da6;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px;
        margin: 40px;
    }
    .flight-info {
        flex: 5;
        padding-left: 1vw;
    }
    .passenger {
        border-radius: 8px;
        background-color: #9cb4cc;
        margin: 8px;
        width: 15vw;
    }
</style>
