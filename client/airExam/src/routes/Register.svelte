<script>
    import {
        verifyEmail,
        verifyPassword,
        register,
    } from "../miscellaneous/functions";
    import { user } from "../stores/user";
    import { inboundFlight, outboundFlight } from "../stores/flight";
    import { passagers } from "../stores/passagers";
    import { Link } from "svelte-navigator";
    let email;
    let password;
    let repeatPassword;
    let emailError = " ";
    let passwordError = " ";
    let repeatPasswordError = " ";

    async function tryRegister() {
        emailError = " ";
        passwordError = " ";
        repeatPasswordError = " ";
        if (
            verifyEmail(email) &&
            verifyPassword(password) == "Correct" &&
            password == repeatPassword
        ) {
            let registerMsg = await register(email, password, repeatPassword);
            alert(registerMsg + " " + $user.email);
            if (
                registerMsg == "Successfully registered!" &&
                $inboundFlight != {} &&
                $outboundFlight != {} &&
                $passagers[0].outboundSeat != undefined
            ) {
                navigate("/confirmReservation");
            } else if (registerMsg == "Successfully registered!") {
                navigate("../");
            }
        }
        if (!verifyEmail(email)) {
            emailError = "This is not a valid email!";
        }
        if (verifyPassword(password) != "Correct") {
            passwordError = verifyPassword(password);
        }
        if (password != repeatPassword) {
            repeatPasswordError = "Passwords are not matching!";
        }
    }
</script>

<section class="section-centered">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body p-5">
                            <h2 class="text-uppercase text-center mb-5">
                                Create an account
                            </h2>

                            <form>
                                <div class="form-outline mb-4">
                                    <p class=".text-danger">{emailError}</p>
                                    <input
                                        type="email"
                                        bind:value={email}
                                        id="form3Example3cg"
                                        class="form-control form-control-lg"
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example3cg">Your Email</label
                                    >
                                </div>

                                <div class="form-outline mb-4">
                                    <p class=".text-danger">{passwordError}</p>
                                    <input
                                        type="password"
                                        bind:value={password}
                                        id="form3Example4cg"
                                        class="form-control form-control-lg"
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example4cg">Password</label
                                    >
                                </div>

                                <div class="form-outline mb-4">
                                    <p class=".text-danger">
                                        {repeatPasswordError}
                                    </p>
                                    <input
                                        type="password"
                                        bind:value={repeatPassword}
                                        id="form3Example4cdg"
                                        class="form-control form-control-lg"
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example4cdg"
                                        >Repeat your password</label
                                    >
                                </div>

                                <div class="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                        on:click={tryRegister}>Register</button
                                    >
                                </div>

                                <p class="text-center text-muted mt-5 mb-0">
                                    Have already an account? <Link
                                        to="/login"
                                        class="fw-bold text-body"
                                        ><u>Login here</u></Link
                                    >
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .section-centered {
        margin-top: 10vh;
    }
</style>
