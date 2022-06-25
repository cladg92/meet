import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert
          className="error-alert"
          text={this.props.errorText}
          className="alert"
        />
        <label for="number" className="label">
          Events in the next 7 days:
        </label>
        <input
          type="number"
          id="number"
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
