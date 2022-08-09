import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class Event extends Component {
  state = {
    show: false,
  };

  handleShowDetails = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    return (
      <div className="event">
        <Card className="event-card" key={this.props.event}>
          <Card.Body>
            <Card.Title border="primary" className="summary">
              {this.props.event.summary}
            </Card.Title>
            <Card.Text className="dateTime">
              {new Date(this.props.event.start.dateTime).toString()}
            </Card.Text>
            <Card.Text className="location">
              {this.props.event.location}
            </Card.Text>

            {this.state.show ? (
              <p className="description event__Details">
                {this.props.event.description}
              </p>
            ) : null}
            <Button
              className="button"
              variant="warning"
              onClick={() => this.handleShowDetails(this.state)}
            >
              {this.state.show ? "Hide details" : "Show details"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Event;
