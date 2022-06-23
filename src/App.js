import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { Navbar, Container, Row, Col } from "react-bootstrap";

class App extends Component {
  state = {
    events: [],
    allEvents: [],
    locations: [],
    numberOfEvents: 12,
    currentLocation: "all",
  };

  componentDidMount() {
    this.mounted = true;
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

  handleInputChanged = (event) => {
    const value = event.target.value;
    const allEvents = this.state.allEvents;
    const { currentLocation } = this.state;
    const locationEvents =
      currentLocation === "all"
        ? allEvents
        : allEvents.filter((event) => event.location === currentLocation);
    this.setState({
      numberOfEvents: value,
      events: locationEvents.slice(0, value),
    });
    console.log(allEvents.length);
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
      console.log(this.state.currentLocation);
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="warning" sticky="top">
          <Container fluid>
            <Navbar.Brand href="/meet" className="page-title">
              <img
                alt=""
                src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Globe-icon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Meet App
            </Navbar.Brand>
          </Container>
        </Navbar>
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          handleInputChanged={this.handleInputChanged}
        />
        <CitySearch
          className="CitySearch"
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
          setSelected={this.setSelected}
        />
        <EventList className="EventList" events={this.state.events} />
      </div>
    );
  }
}

export default App;
