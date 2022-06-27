<script>
    import { onDestroy } from "svelte";

    import { Link, useNavigate } from "svelte-navigator";
    import { getCookie, setCookie } from "../functions/functions";
    import { logout } from "../functions/apiCalls";
    const navigate = useNavigate();
    let loggedIn = getCookie("loggedIn") == "true";
    let userRole = getCookie("userRole");
    async function logOut() {
        await logout();
        navigate("../");
    }

    setInterval(() => {
        loggedIn = getCookie("loggedIn") == "true";
        userRole = getCookie("userRole");
    }, 1000);

    onDestroy(() => {
        setCookie("loggedIn", false);
        setCookie("userRole", "");
    });
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top navigation">
    <div class="container">
        <a class="navbar-brand" href="/">
            <p alt="Air exam" height="36">Air Node</p>
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
                {#if userRole != "ADMIN"}
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Flight</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/about">About</Link>
                    </li>
                {:else}
                    <li class="nav-item">
                        <Link class="nav-link" to="/createFlight"
                            >Create Flight</Link
                        >
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/overview">Overview</Link>
                    </li>
                {/if}
                {#if !loggedIn}
                    <li class="nav-item">
                        <Link class="nav-link" to="/login">Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/register">Register</Link>
                    </li>
                {:else}
                    <li class="nav-item">
                        <Link class="nav-link" to="/myflights">MyFlights</Link>
                    </li>
                    <li class="nav-item">
                        <p class="nav-link" on:click={logOut}>Logout</p>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    .navigation {
        height: 7vh;
        background-color: #748da6 !important;
    }
</style>
