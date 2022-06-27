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

export { setCookie, getDayOfTheWeek, getMonth, getCookie, validateName, verifyEmail, verifyPassword, pastDate, futureDate, getNumberOfUniqueValues }

