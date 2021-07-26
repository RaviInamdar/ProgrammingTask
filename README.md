# ProgrammingTask
#
# PURPOSE
  - The purpose of the 'programmingTask' application is to take in data from 2 API endpoints, combine the data, and generate a table of the data visible to the end user.
#
# ASSUMPTIONS
# (Given assumptions)
  - the ID columns have a foreign key relationship
  - each id MAY NOT exist in both tables
# (Additional assumptions)
  - data from both endpoints are always an array of objects.
  - the endpoint URL will give data. that is, no "fishing" is required to obtain needed data.
  - the 'ID' field is present in every object item.
  - there are not duplicate 'ID' fields within the same endpoint.
  - objects within the endpoint data is always consistent. Other than the ID field, each object within a single given endpoint data is uniform (they will have the same set of keys, not different keys for different objects)
#
# TESTING
 - Unit testing of the code is done using jest. Code was organized in a way where most major actions are broken down into functions with return values. Data can then easily be tested with expected output based on different inputs. Testing of fetch() is also done.
 - If this data were to be interactive, adding selenium or cypress tests would make sense (i.e. say, there was a button for a user to click that resulted in the table appearing)
#
# OPPORTUNITIES FOR IMPROVEMENT
  - Mostly, "pure" javascript was used for the creation of this function. This provided limitations in terms of:
  - *Expanding this to scale with larger functionalities*: If this simple project were to expand to having multiple tables or different parts of a single-page application (SPA), the current architecture would not suit well for an expansion. Transition to React, Angular, etc. would be advisable
  - *Displaying API data*: Currently, pure javascript functions are called for creating table headers, rows, and cells. This creates some limitations in how we can organize and display the data on the table. For example, extra functions and lines of code were created to (1) add extra objects where objects don't exist and (2) "order" the header/object key data in a way where data displays uniformly across the table.
  - Using a framework like React, we could have created this API table into a component where we could render the table-specific HTML data separately in a different file. and combine a forEach() loop of the table to pull on the object name directly using dot notation (ex. item.id, item.age, etc)**
 - (however, the one advantage to having the code done this way is that no api-specific key other than ID is referenced during the creation of the table. In the use of React, we would possibly need to create additional functionality to destructure the unknown keys and refer to these keys when doing the forEach() function )
 - related to *displaying API data*, an improvement to the current code base could have been made by adding functionality to sort the result data by ID number.
 - related to *the headers of the table*, Currently the headers are  being directly brought in from the endpoints (with the assumption that data points are uniform per endpoint...SEE: Assumptions above). As such, the headers are still either lower-case or camel-case. This does not result in a finished product. Additional code could be written to either capitalize the first word in the sentence, or figure out a way to break a space between a lowercase letter and uppercase letter if they do not have a space between them (the condition for finding camelcase) - I am not entirely sure the way I would code this snippet out but this would be an enhancement to aid the display of the table. 
#
#
#
#
#
#
#
#
#
#
#
