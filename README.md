# meet-app

## Description

This project was part of the [Career Foundry Full Stack Web Development course](https://careerfoundry.com/en/courses/become-a-web-developer/).

Serverless, progressive web application (PWA) built using React using a test-driven development (TDD) technique. The app uses the Google Calendar API to fetch and display upcoming events by city.

Check it out live [here](https://cladg92.github.io/meet/).

## Features and Test Scenarios

### Feature 1: Filter events by city.

User story: As a user I should be able to “filter events by city” So that I can see the list of events that take place in that city.

- _SCENARIO 1_: When user hasn’t searched for a city, show upcoming events from all cities.
  **Given** user hasn’t searched for any city
  **When** the user opens the app
  **Then** the user should see a list of all upcoming events
- _SCENARIO 2_: User should see a list of suggestions when they search for a city.
  **Given** the main page is open
  **When** user starts typing in the city textbox
  **Then** the user should see a list of cities (suggestions) that match what they’ve typed
- _SCENARIO 3_: User can select a city from the suggested list.
  **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
  **When** the user selects a city (e.g., “Berlin, Germany”) from the list
  **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

### Feature 2: Show/hide an event’s details

User story: As a user I should be able to “Show/hide an event’s details” So that I can see and hide the details of each event.

- _SCENARIO 1_: An event element is collapsed by default.
  **Given** user hasn’t clicked on any event
  **When** the user opens the app
  **Then** the user should see a list event cards with general info (e.g., name of event and location)
- _SCENARIO 2_: User can expand an event to see its details.
  **Given** the main page is open
  **When** the user clicks on an event’s button
  **Then** the information about that event will expand to reveal its full contents
- _SCENARIO 3_: User can collapse an event to hide its details.
  **Given** the event’s detail page is expanded
  **When** the user clicks on the event’s button
  **Then** the information about that event will collapse

### Feature 3: Specify number of events

User story: As a user I should be able to “Specify number of events” So that I can set the number of visible events I see on the page

- _SCENARIO 1_: When user hasn’t specified a number, 12 is the default number.
  **Given** user hasn’t specified a number of events
  **When** the user opens the app
  **Then** the user can see 32 events
- _SCENARIO 2_: User can change the number of events they want to see.
  **Given** the main page is open
  **When** the user specifies a number X of events
  **Then** the user will see X events

### Feature 4: Use the app when offline

User story: As a user I should be able to “Use the app when offline” So that I can see the page with the previously defined settings also when offline.

- _SCENARIO 1_: Show cached data when there’s no internet connection.
  **Given** the user is offline
  **When** the user opens the app
  **Then** the user will still be able to use the app
- _SCENARIO 2_: Show error when user changes the settings (city, time range).
  **Given** the user opens the app offline
  **When** the user changes the settings
  **Then** the user will see an error message

### Feature 5: Data Visualization

User story: As a user I should be able to “Visualize a chart with displayed data” So that I can see the number of upcoming events in each city

- _SCENARIO 1_: Show a chart with the number of upcoming events in each city.
  **Given** the main page is open
  **When** the user clicks on the chart button
  **Then** the user will see a chart with the number of upcoming events in each city

## Technologies

AWS Lambda, OAuth2 Authorization protocol, Jest, Enzyme, Jest-Cucumber, Puppeteer, Atatus
