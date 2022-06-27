import { user } from "../stores/user";

function pastDate(dateString, daysToSubtract) {
    let dateAttributes = dateString.split("-")
    let returnDate = new Date(dateAttributes[0], dateAttributes[1] - 1, dateAttributes[2]);
    returnDate.setDate(returnDate.getDate() - daysToSubtract);
    if (returnDate.getTime() > Date.now())
        return returnDate;
    else {
        returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 1)
        return returnDate;
    }
}

function futureDate(dateString, daysToAdd) {
    let dateAttributes = dateString.split("-")
    let returnDate = new Date(dateAttributes[0], dateAttributes[1] - 1, dateAttributes[2]);
    returnDate.setDate(returnDate.getDate() + daysToAdd)
    return returnDate;
}

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

function verifyEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function verifyPassword(password) {
    let msg = "Correct"
    switch (true) {
        case password == "" || password == undefined:
            msg = "Password cannot be empty"
            break
        case (password.length < 6 || password.length > 15):
            msg = 'Bad password length'
            break
    }
    return msg
}

async function getSeatAvailabilities(flightId) {
    let seats = await fetch("http://localhost:8000/ticket/flight/" + flightId);
    seats = seats.json();
    return seats;
}

async function getNumberOfUniqueValues(array) {
    let uniqueValues = [];
    array.forEach(item => {
        let isUnique = true;
        uniqueValues.forEach(uniqueValue => {
            if (uniqueValue == item) {
                isUnique = false;
            }
        });
        if (isUnique)
            uniqueValues.push(item);
    });
    return uniqueValues.length;
}

function validateName(name) {
    var regName = /^[a-zA-Z]+$/;
    return regName.test(name);
}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    let result = "";
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            result = c.substring(name.length, c.length);
            return result;
        }
    }
    return result;
}

async function bookFlightTickets(passager, seat, flightId) {
    const rawResponse = await fetch('http://localhost:8000/ticket/flight/' + flightId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        redirect: 'follow',
        credentials: "include",
        body: JSON.stringify({ ticket: { ticket_row: seat.row, ticket_seat: seat.seat }, passager: { firstName: passager.firstName, lastName: passager.lastName, documentType: passager.documentType, documentId: passager.documentId } })
    });
    const content = await rawResponse.json();
    if (!content.msg)
        return (content.error)
    else {
        return (content.msg);
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

function getDayOfTheWeek(day) {
    switch (day) {
        case 0:
            return "Sun";
            break;
        case 1:
            return "Mon";
            break;
        case 2:
            return "Tue";
            break;
        case 3:
            return "Wed";
            break;
        case 4:
            return "Thu";
            break;
        case 5:
            return "Fri";
            break;
        case 6:
            return "Sat";
            break;
        default:
            break;
    }
}

function getMonth(month) {
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            break;
    }
}

async function fetchPassagerById(passagerId) {
    try {
        const response = await fetch(
            "http://localhost:8000/passager/" + passagerId,
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

export { scheduleFlights, setCookie, fetchPassagerById, fetchFlightById, getDayOfTheWeek, getMonth, fetchTicketsForUser, bookFlightTickets, getCookie, logout, validateName, fetchFlights, login, register, verifyEmail, verifyPassword, pastDate, futureDate, getSeatAvailabilities, getNumberOfUniqueValues }

