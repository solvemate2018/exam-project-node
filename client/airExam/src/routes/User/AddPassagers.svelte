<script>
    import { useNavigate } from "svelte-navigator";
    import { passagers } from "../../stores/passagers";
    import { validateName } from "../../miscellaneous/functions";
    import RouteInfo from "../../components/RouteInfo.svelte";
    let numberOfPassagers = 1;
    let numberOfPassagersValue;
    let numberOfPassagersError = "";
    let allPassagersValid = false;
    const navigate = useNavigate();
    $passagers = [];

    function checkIfFormIsReady(index) {
        let firstName = document.querySelector("#firstName" + index);
        let lastName = document.querySelector("#lastName" + index);
        let documentType = document.querySelector("#documentType" + index);
        let documentId = document.querySelector("#documentId" + index);

        let msg = document.querySelector("#msg" + index);
        msg.textContent = "";
        let isNotValid = false;
        if (!validateName(firstName.value) || !validateName(lastName.value)) {
            msg.textContent += " Invalid name!";
            isNotValid = true;
        } else if (
            documentType.value != "Passport" &&
            documentType.value != "ID card"
        ) {
            msg.textContent += " Invalid document type!";
            isNotValid = true;
        } else if (
            documentId.value.length != 10 ||
            !/^[0-9]+$/.test(documentId.value)
        ) {
            msg.textContent += "Invalid document ID!";
            isNotValid = true;
        } else {
            $passagers[index] = {
                firstName: firstName.value,
                lastName: lastName.value,
                documentType: documentType.value,
                documentId: documentId.value,
            };
        }
        if (isNotValid) {
            $passagers.splice(index, 1);
        }
        allPassagersValid = $passagers.length == numberOfPassagers;
    }

    function checkNumberOfPassagers() {
        if (numberOfPassagersValue > 5) {
            numberOfPassagers = 5;
            numberOfPassagersError =
                "Max number of passagers at the time is 5!";
        } else if (numberOfPassagersValue < 1) {
            numberOfPassagers = 1;

            numberOfPassagersError =
                "Min number of passagers at the time is 1!";
        } else {
            numberOfPassagers = numberOfPassagersValue;
            numberOfPassagersError = "";
        }
        checkIfFormIsReady(numberOfPassagers - 1);
    }
</script>

<div class="container">
    <RouteInfo />
    <h5>Please select a number of passagers</h5>
    <input
        bind:value={numberOfPassagersValue}
        type="number"
        placeholder="1"
        max="5"
        min="1"
        on:change={checkNumberOfPassagers}
        on:click={checkNumberOfPassagers}
    />
    <p>{numberOfPassagersError}</p>
    {#each Array(numberOfPassagers) as _, index (index)}
        <form id={"form" + index}>
            <h6>Passager {index + 1}</h6>
            <input
                id={"firstName" + index}
                on:change={() => checkIfFormIsReady(index)}
                type="text"
                placeholder="First name"
            />
            <input
                id={"lastName" + index}
                on:change={() => checkIfFormIsReady(index)}
                placeholder="Last name"
            />
            <input
                id={"documentType" + index}
                on:change={() => checkIfFormIsReady(index)}
                placeholder="Document Type"
                list="documentTypes"
            />
            <input
                id={"documentId" + index}
                on:change={() => checkIfFormIsReady(index)}
                type="text"
                placeholder="Document Id"
            />
            <p id={"msg" + index} class="errorMsg" />
        </form>
    {/each}
    <datalist id="documentTypes">
        <option value="Passport" /><option value="ID card" /></datalist
    >
    {#if allPassagersValid}
        <button
            on:click={() => navigate("/bookTickets")}
            type="button button-link"
            class="button"><p class="button-text">Reserve Seats</p></button
        >
    {/if}
</div>

<style>
    .errorMsg {
        color: red;
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
</style>
