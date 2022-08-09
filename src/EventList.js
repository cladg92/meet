import React from "react";
import Event from "./Event";
import { Row, Col } from "react-bootstrap";

function EventList(props) {
  const { events } = props;
  return (
    <ul className="EventList">
      <Row>
        {events.map((event) => (
          <Col key={event.id} sm={12} md={6}>
            <li>
              <Event className="event" event={event} />
            </li>
          </Col>
        ))}
      </Row>
    </ul>
  );
}

export default EventList;
