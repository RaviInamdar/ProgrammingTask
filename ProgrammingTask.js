
/*
  first, we want to get the URLs into our JS and save them as variables to refer
  to them later. W store these variables as constants because during the
  execution of the program, we do not expect the URLs to change.
*/
const api_1 =
      'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/ages';

const api_2 =
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


/*
function createTable(url){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("data is ", data);
    for(let i = 0; i < data.length; i++){
      console.log(data[i]);
      console.log(Object.keys(data[i]));

    }
    objectData = data;
    //fire everything here, create functions to pass in / return
  })
}
*/

// use the retrieveAPI() function to get and save names.
async function main() {
  var api1Data = await retrieveAPI(api_1);
  var api2Data = await retrieveAPI(api_2);
  console.log('api 1 data is ', api1Data);
  console.log('api 2 data is ', api2Data);

  // retrieve keys
  var api1Keys = Object.keys(api1Data[0]);
  var api2Keys = Object.keys(api2Data[0]);
  console.log(Object.keys(api1Data[0]));
  console.log(Object.keys(api2Data[0]));

  var combinedKeys = [...new Set (api2Keys.concat(api1Keys))];
  console.log("combined keys are ", combinedKeys);

  // const combinedTable = api1Data.filter(({ id: first_id }) =>
  //   api2Data.every(({ id: second_id }) =>
  //  first_id !== second_id));

  // const newArr = api2Data.concat(combinedTable).map((rowData) => rowData);

  // console.log(JSON.stringify(newArr));

  // var htmlTable = document.getElementById('taskTable');
  // htmlTable.insertRow(0);

  // right now i have 2 array of objects, that need to be combinedKeys

  //compare array of object 1 to object 2
  //for each item in array 1...
  //  search for array 1[item].id in object 2
  //    if found, combine the objects
  //    else, loop through api2 keys and add blank elements "". and combine these
  const returnArray = api1Data.map(api1Item => {
    api2Data.forEach(api2Item => {
      if(api2Item.id === api1Item.id){
        {...api1Item, ...api2Item}
      }
    })
  })
  console.log(returnArray);

}
main();
// var apiNames = createTable(api_names);
// var apiAges = createTable(api_ages);

// console.log('ageData is', apiAgeData);
// console.log('nameData is', apiNameData);
