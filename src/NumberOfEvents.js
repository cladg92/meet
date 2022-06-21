import React, { Component } from "react";

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
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
