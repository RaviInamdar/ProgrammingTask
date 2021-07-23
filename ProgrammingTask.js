
/*
  first, we want to get the URLs into our JS and save them as variables to refer
  to them later. W store these variables as constants because during the
  execution of the program, we do not expect the URLs to change.
*/
const api_ages =
      'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/ages';

const api_names =
      'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/names';

/*
  this function is important as it gives us the external API data by using
  fetch(), a (relatively) new JS way of retrieving files. We will use this
  function to call both api's.
*/
async function retrieveAPI(url){
  // retrieves response from the URl using fetch()
	const response = await fetch(url);
  // saves response data as JSON object -> an easy way to use data in JS
  var data = await response.json();
  console.log('data is', data);
  // we want to return this data as we want to save it outside of this fxn
  return data;
}

// use the retrieveAPI() function to get and save names.
var apiAgeData = retrieveAPI(api_ages) || [];
var apiNameData = retrieveAPI(api_names) || [];

console.log('ageData is', apiAgeData);
console.log('nameData is', apiNameData);

/*
  We are going to do 2 things here.
  - convert all data in api_ages and api_names into their own separate ageData
  - combine data from both tables into one combination table, where our
  assumption is that id is a field that exists in EVERY line as this is the key

*/

console.log("destructing age and name data...");

destructAges(apiAgeData);
destructNames(apiNameData);

function destructAges(api){
  console.log("ID | AGE")
  for(let i = 0; i < api.length; i++){
    console.log(api[i].id, " | " ,api[i].age);
    console.log(\n);
  }
}

function destructNames(api){
  console.log("ID | FIRST NAME | LAST NAME")
  for(let i = 0; i < api.length; i++){
    console.log(api[i].id, " | ", api[i].firstName, " | ", api[i].lastName);
    console.log(\n);
  }
}
