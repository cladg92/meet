import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

// Group test into scope
describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });
  test("render event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });
  test("render event dateTime", () => {
    expect(EventWrapper.find(".dateTime")).toHaveLength(1);
  });
  test("render event location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });
  test("render show details button", () => {
    expect(EventWrapper.find(".button")).toHaveLength(1);
  });
  test("see if handleShowDetails works", () => {
    EventWrapper.setState({ show: false });
    EventWrapper.find(".button").simulate("click");
    expect(EventWrapper.state("show")).toBe(true);
  });
  test("render description element", () => {
    EventWrapper.setState({ show: false });
    EventWrapper.find(".button").simulate("click");
    expect(EventWrapper.find(".description")).toHaveLength(1);
    expect(EventWrapper.find(".description").text()).toBe(
      mockData[0].description
    );
  });
  test("hide description element", () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find(".button").simulate("click");
    expect(EventWrapper.find(".description")).toHaveLength(0);
  });
});
