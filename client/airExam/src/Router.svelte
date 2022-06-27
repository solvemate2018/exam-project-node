<script>
  import { Router, Route } from "svelte-navigator";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Flights from "./routes/User/Flights.svelte";
  import BookTickets from "./routes/User/BookTickets.svelte";
  import About from "./routes/User/About.svelte";
  import Login from "./routes/Login.svelte";
  import Register from "./routes/Register.svelte";
  import AddPassengers from "./routes/User/AddPassengers.svelte";
  import ConfirmReservation from "./routes/User/ConfirmReservation.svelte";
  import MyFlights from "./routes/User/MyFlights.svelte";
  import CreateFlight from "./routes/Admin/CreateFlight.svelte";
  import Overview from "./routes/Admin/Overview.svelte";
</script>

<Router>
  <section class="min-vh-100">
    <div class="d-flex flex-column bd-highlight justify-content-start">
      <nav>
        <Header />
      </nav>

      <div id="content">
        <Route path="/"><Flights /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/addPassengers"><AddPassengers /></Route>
        <Route path="/bookTickets"><BookTickets /></Route>
        <Route path="/confirmReservation"><ConfirmReservation /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/myflights"><MyFlights /></Route>
        <Route path="/createFlight"><CreateFlight /></Route>
        <Route path="/overview"><Overview /></Route>
      </div>
      <Footer />
    </div>
  </section>
</Router>

<style>
  #content {
    min-height: 87vh;
    background-color: #d3cedf;
  }
</style>
