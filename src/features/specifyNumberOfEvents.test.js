import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 6 is the default number.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t specified a number of events", () => {});
    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = shallow(<App />);
    });

    then("the user can see 6 events", () => {
      AppWrapper.update();
      expect(AppWrapper.state("events")).toHaveLength(6);
    });
  });

  test("User can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    let NumberOfEventsWrapper;
    given("the main page is open", () => {
      AppWrapper = mount(<App />);
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    });

    when("the user specifies a number X of events", () => {
      const eventObject = { target: { value: 3 } };
      NumberOfEventsWrapper.find(".number").simulate("change", eventObject);
    });

    then("the user will see X events", () => {
      AppWrapper.update();
      expect(AppWrapper.state("numberOfEvents")).toBe(3);
      expect(AppWrapper.find(".EventList li")).toHaveLength(3);
    });
  });
});
