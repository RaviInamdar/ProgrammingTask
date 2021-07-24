
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
/*
async function retrieveAPI(url){
  // retrieves response from the URl using fetch()
	const response = await fetch(url);
  // saves response data as JSON object -> an easy way to use data in JS
  var data = await response.json();
  console.log('data is', data);
  // we want to return this data as we want to save it outside of this fxn
  return data;
}
*/

function createTable(url){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("data is ", data);
    for(let i = 0; i < data.length; i++){
      console.log(data[i]);
      console.log(Object.keys(data));
    }
    return data;
    //fire everything here, create functions to pass in / return
  })
}

// use the retrieveAPI() function to get and save names.
// var apiAgeData = retrieveAPI(api_ages);
// var apiNameData = retrieveAPI(api_names);

var apiNames = createTable(api_names);
var apiAges = createTable(api_ages);

// console.log('ageData is', apiAgeData);
// console.log('nameData is', apiNameData);

console.log('name data is ', apiNames);
console.log('ages data is ', apiAges);

console.log('name keys is ', dataKeys(apiNames));
console.log('ages keys is ', dataKeys(apiAges));

function dataKeys(data){
  return Object.keys(data);
}
