import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { Navbar, Container } from "react-bootstrap";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    allEvents: [],
    locations: [],
    numberOfEvents: 12,
    currentLocation: "all",
    showWelcomeScreen: undefined,
  };

  componentDidMount() {
    this.mounted = true;
    this.promptOfflineWarning();
    const accessToken = localStorage.getItem('access_token');
const isTokenValid = (await checkToken(accessToken)).error ? false :
true;
const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
this.setState({ showWelcomeScreen: !(code || isTokenValid) });
if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          allEvents: events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        WarningText: "Warning: you are viewing an offline version of this page",
      });
    } else {
      return this.setState({
        ErrorText: "",
      });
    }
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const allEvents = this.state.allEvents;
    const { currentLocation } = this.state;
    const locationEvents =
      currentLocation === "all"
        ? allEvents
        : allEvents.filter((event) => event.location === currentLocation);
    if (value <= 0 || value > 250) {
      this.setState({
        numberOfEvents: value,
        events: locationEvents.slice(0, value),
        ErrorText: "Select number from 1 to 250",
      });
    } else {
      return this.setState({
        numberOfEvents: value,
        events: locationEvents.slice(0, value),
        ErrorText: "",
      });
    }
  };

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      const filteredEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: filteredEvents,
        currentLocation: location,
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <Navbar bg="warning" sticky="top">
          <Container fluid>
            <Navbar.Brand href="/meet" className="page-title">
              <img
                alt=""
                src="https://raw.githubusercontent.com/Glenzy/meet/master/public/meet-app-192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Meet App
            </Navbar.Brand>
          </Container>
        </Navbar>
        <br></br>
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          handleInputChanged={this.handleInputChanged}
          errorText={this.state.ErrorText}
        />
        <CitySearch
          className="CitySearch"
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
          setSelected={this.setSelected}
        />
        <br></br>
        <WarningAlert className="warning-alert" text={this.state.WarningText} />
        <EventList className="EventList" events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
