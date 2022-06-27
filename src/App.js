import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations } from "./api";
//checkToken, getAccessToken
import { Row, Col } from "react-bootstrap";
import { WarningAlert } from "./Alert";
//import WelcomeScreen from "./WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    allEvents: [],
    locations: [],
    numberOfEvents: 12,
    currentLocation: "all",
    //showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    this.promptOfflineWarning();
    /*const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {*/
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
  //}

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
        ErrorText: `Select number from 1 to ${this.state.allEvents.length}`,
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    /*if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;*/
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1 className="page-title">Meet App</h1>
        <br></br>
        <Row className="justify-content-md-center">
          <Col sm={12} md={3}>
            <CitySearch
              className="CitySearch"
              locations={locations}
              updateEvents={this.updateEvents}
              numberOfEvents={numberOfEvents}
              setSelected={this.setSelected}
            />
          </Col>
          <Col sm={12} md={3}>
            <NumberOfEvents
              numberOfEvents={numberOfEvents}
              handleInputChanged={this.handleInputChanged}
              errorText={this.state.ErrorText}
            />
          </Col>
        </Row>
        <br></br>
        <h5 className="page-title">Events in each city</h5>

        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <WarningAlert className="warning-alert" text={this.state.WarningText} />
        <EventList className="EventList" events={this.state.events} />
        {/*<WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />*/}
      </div>
    );
  }
}

export default App;
