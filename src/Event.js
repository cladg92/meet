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
          <Card.Img variant="top" src="https://picsum.photos/200/100" />
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
            {this.state.show && (
              <Button
                className="button"
                variant="warning"
                onClick={() => this.handleShowDetails(this.state)}
              >
                hide details
              </Button>
            )}

            {!this.state.show && (
              <Button
                className="button"
                variant="warning"
                onClick={() => this.handleShowDetails(this.state)}
              >
                show details
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Event;
