import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

// Testing scenarios of feature 2

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("user hasn’t clicked on any event", () => {});
    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });
    let EventWrapper;
    then(
      "the user should see a list event cards with general info (e.g., name of event and location)",
      () => {
        AppWrapper.update();
        EventWrapper = AppWrapper.find(Event);
        expect(AppWrapper.find(EventList)).toBeDefined();
        expect(EventWrapper.find(".event-card")).toBeDefined();
      }
    );
  });

  test("User can expand an event to see its details.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the main page is open", () => {
      AppWrapper = mount(<App />);
    });

    when("the user clicks on an event’s button", () => {
      AppWrapper.update();
      AppWrapper.find(".event button").at(0).simulate("click");
    });

    then(
      "the information about that event will expand to reveal its full contents",
      () => {
        expect(AppWrapper.find(".description")).toHaveLength(1);
      }
    );
  });

  test("User can collapse an event to hide its details.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the event’s detail page is expanded", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".event button").at(0).simulate("click");
      expect(AppWrapper.find(".description")).toHaveLength(1);
    });

    when("the user clicks on the event’s button", () => {
      AppWrapper.find(".event button").at(0).simulate("click");
    });

    then("the information about that event will collapse", () => {
      expect(AppWrapper.find(".description")).toHaveLength(0);
    });
  });
});
