import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

// Group test into scope
describe("<App /> component", () => {
  let AppWrapper;
  // executed before each test
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // tests
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch (suggested events by city", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents component", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });
  test('App passes "numberOfEvents" state as a prop to NumberOfEvents component', () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state("numberOfEvents");
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(
      AppNumberState
    );
    AppWrapper.unmount();
  });
  test('App passes "numberOfEvents" state as a prop to CitySearch component', () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state("numberOfEvents");
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().numberOfEvents).toEqual(
      AppNumberState
    );
    AppWrapper.unmount();
  });
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const numberOfEvents = AppWrapper.state("numberOfEvents");
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(
      allEvents.slice(0, numberOfEvents)
    );
    AppWrapper.unmount();
  });
  test("change state number when input changes", () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    //AppWrapper.setState({ numberOfEvents: 10 });
    const eventObject = { target: { value: 20 } };
    NumberOfEventsWrapper.find(".number").simulate("change", eventObject);
    expect(AppWrapper.state("numberOfEvents")).toBe(20);
    AppWrapper.unmount();
  });
  /*test("get list of events matching the number selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    AppWrapper.setState({ numberOfEvents: 3 });
    const selectedNumber = 5;
    await NumberOfEventsWrapper.find(".number").simulate("change", {
      target: { value: selectedNumber },
    });
    const allEvents = await getEvents();
    const eventsToShow = allEvents.slice(0, selectedNumber);
    //expect(AppWrapper.state("events")).toEqual(eventsToShow);
    expect(AppWrapper.state("events")).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });*/
});
