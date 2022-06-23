import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import { Row, Col } from "react-bootstrap";

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert className="error-alert" text={this.props.errorText} />
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
