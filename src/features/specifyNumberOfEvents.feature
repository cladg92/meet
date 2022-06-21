Feature: Specify number of events

Scenario: When user hasn’t specified a number, 5 is the default number.
Given user hasn’t specified a number of events 
When the user opens the app 
Then the user can see 5 events
Scenario: User can change the number of events they want to see. 
Given the main page is open 
When the user specifies a number X of events 
Then the user will see X events