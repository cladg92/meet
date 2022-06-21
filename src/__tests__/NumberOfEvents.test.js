import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test("render number input", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });
  /*test("render number input correctly", () => {
    const query = NumberOfEventsWrapper.state("query");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toEqual(query);
  });*/
});
