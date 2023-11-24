import React, { useEffect } from "react";
import { Router as Router, Link, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import history from "./history";
import SelectFlight from "./components/SelectFlight";
import Passengers from "./components/Passengers";
import SelectService from "./components/SelectService";
import "./App.css";
import BillingInfo from "./components/BillingInfo";
import BookingSuccess from "./components/BookingSuccess";
import SearchTicket from "./components/pages/SearchTicket";
import Footer from "./components/Footer";
import SignUp from "./components/pages/Signup";
import SignIn from "./components/pages/SigIn";
import Profile from "./components/pages/Profile";
import PaymentSucces from "./components/pages/PaymentSucces";
import { fetchAirports } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.fetchAirports();
  }, []);
  return (
    <Router history={history}>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/search-booking" exact component={SearchTicket} />
      <Route path="/select-flight" exact component={SelectFlight} />
      <Route path="/passengers" exact component={Passengers} />
      <Route path="/select-service" exact component={SelectService} />
      <Route path="/billing-info" exact component={BillingInfo} />
      <Route path="/booking-success" exact component={BookingSuccess} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/paymentsucces" exact component={PaymentSucces} />
      <Footer />
    </Router>
  );
}

export default connect(null, { fetchAirports })(App);
