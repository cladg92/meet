import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert />
        <input
          type="number"
          className="number"
          value={this.props.numberOfEvents}
          onChange={this.props.handleInputChanged}
          placeholder="Number of events"
        />
      </div>
    );
  }
}

export default NumberOfEvents;
