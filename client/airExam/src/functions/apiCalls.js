async function fetchFlights(origin, destination, from, to) {
    if (origin == "" || destination == "") {
        alert("You cannot leave empty fields!");
    } else {
        try {
            const response = await fetch(
                "http://localhost:8000/flight/fetchBy",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        destination: destination,
                        origin: origin,
                        startDate: from,
                        finishDate: to,
                    }),
                }
            );

            return await response.json();
        } catch (err) {
            alert(err);
        }
    }
}
async function fetchTicketsForUser() {
    try {
        const response = await fetch(
            "http://localhost:8000/ticket/user",
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
            }
        );

        return await response.json();
    } catch (err) {
        alert(err);
    }
}
async function login(email, password) {
    const rawResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ email: email, password: password }),
        redirect: 'follow',
        credentials: "include"
    });
    const content = await rawResponse.json();
    if (content.error) {
        return (content.error);
    }
    else {
        user.set({ email: email, loggedIn: true });
        setCookie("loggedIn", true);
        setCookie("userRole", content.userRole);
        return ("Successful");
    }
}

async function register(email, password, repeatPassword) {
    const rawResponse = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        redirect: 'follow',
        credentials: "include",
        body: JSON.stringify({ email: email, password: password, repeatPassword: repeatPassword })
    });
    const content = await rawResponse.json();
    if (!content.msg)
        return (content.error)
    else {
        user.set({ email: email, loggedIn: true });
        setCookie("loggedIn", true);
        return (content.msg);
    }
}

async function logout() {
    let rawResponse = await fetch("http://localhost:8000/user/logout", {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Credentials": true
        },
        redirect: 'follow',
        credentials: "include"
    });
    let response = await rawResponse.json();
    user.set({});
    if (response.error)
        alert(response.error);
    setCookie("loggedIn", false);
    setCookie("userRole", "");
    alert(response.msg);
}

async function getSeatAvailabilities(flightId) {
    let seats = await fetch("http://localhost:8000/ticket/flight/" + flightId);
    seats = seats.json();
    return seats;
}

async function bookFlightTickets(passenger, seat, flightId) {
    const rawResponse = await fetch('http://localhost:8000/ticket/flight/' + flightId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        redirect: 'follow',
        credentials: "include",
        body: JSON.stringify({ ticket: { ticket_row: seat.row, ticket_seat: seat.seat }, passenger: { firstName: passenger.firstName, lastName: passenger.lastName, documentType: passenger.documentType, documentId: passenger.documentId } })
    });
    const content = await rawResponse.json();
    if (!content.msg)
        return (content.error)
    else {
        return (content.msg);
    }
}

async function fetchFlightById(id) {
    try {
        const response = await fetch(
            "http://localhost:8000/flight/id/" + id,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
            }
        );

        return await response.json();
    } catch (err) {
        alert(err);
    }
}

async function fetchPassengerById(passengerId) {
    try {
        const response = await fetch(
            "http://localhost:8000/passenger/" + passengerId,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
            }
        );

        return await response.json();
    } catch (err) {
        alert(err);
    }
}

async function scheduleFlights(flight, frequency, startingFrom, finishingOn) {
    let rawResponse;
    if (frequency == "Ones") {
        rawResponse = await fetch('http://localhost:8000/flight/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            redirect: 'follow',
            credentials: "include",
            body: JSON.stringify({ flight, frequency, startingFrom })
        });
    }
    else {
        rawResponse = await fetch('http://localhost:8000/flight/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            redirect: 'follow',
            credentials: "include",
            body: JSON.stringify({ flight, frequency, startingFrom, finishingOn })
        });
    }
    const response = await rawResponse.json();

    return response;
}

async function getLastFlights() {
    let response = await fetch("http://localhost:8000/flight/past", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    });
    let result = await response.json();
    return result.flights;
}

async function getNextFlights() {
    let response = await fetch("http://localhost:8000/flight/future", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    });
    let result = await response.json();
    return result.flights;
}

async function sumPassedFlights() {
    let response = await fetch("http://localhost:8000/flight/countPast", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    });
    let count = await response.json();
    return count.count;
}

async function sumPlannedFlights() {
    let response = await fetch("http://localhost:8000/flight/countFuture", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    });
    let count = await response.json();
    return count.count;
}

async function sumBookings() {
    let response = await fetch("http://localhost:8000/ticket/count", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
    });
    let count = await response.json();
    return count.count;
}

export { fetchTicketsForUser, sumBookings, sumPlannedFlights, sumPassedFlights, getNextFlights, getLastFlights, scheduleFlights, fetchPassengerById, fetchFlightById, bookFlightTickets, logout, fetchFlights, login, register, getSeatAvailabilities }