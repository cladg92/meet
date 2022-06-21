Feature: Show/hide an event’s details

Scenario: An event element is collapsed by default. 
Given user hasn’t clicked on any event 
When the user opens the app 
Then the user should see a list event cards with general info (e.g., name of event and location)
Scenario: User can expand an event to see its details. 
Given the main page is open 
When the user clicks on an event’s button 
Then the information about that event will expand to reveal its full contents
Scenario: User can collapse an event to hide its details. 
Given the event’s detail page is expanded 
When the user clicks on the event’s button 
Then the information about that event will collapse