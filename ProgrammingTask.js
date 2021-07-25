
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
 This function willl combine all of the data into one consolidated array of
 objects. This resulting array of objects will have duplicate data,
 so we'll take steps to remove the duplicates, and return the consolidated
 data from the two API's.
*/
function mergeArrayObjects(api1Data, api2Data, combinedKeys){
  // first, consolidate the data which will have duplicates
  let consolidatedArray = [...api1Data, ...api2Data];
  // initialize array that will not have duplicates
  let returnArray = [];

  // loop through our consolidated array...
  for(let i = 0; i < consolidatedArray.length; i++){
    let found = false;
    if(i+1 <= consolidatedArray.length){
      // ...and do a check-ahead to see which IDs match.
      // this is the tactic I used to make sure we don't
      // 're-cross' any objects. once an object is dealt
      // with, we move past.
      for(let j = i+1; j < consolidatedArray.length; j++){
        // once a match is found, push to our new array.
        // since these are keys, we assume that there is
        // only 1 id listed per array of objects. this means
        // in our case, there will only ever be up to 2 of the same IDs found
        // total. in the case of traversing, this means a match will only be
        // found once.
        if(consolidatedArray[i].id === consolidatedArray[j].id){
          found = true;
          returnArray.push({...consolidatedArray[j], ...consolidatedArray[i]});
        }
      }
    }
    if(!found){
      // at this point, we're dealing with an object that hasn't found a duplicate.
      let existsInNewArray = false;
      // we run through the list of non-duplicated array of objects and make
      // sure it doesn't exist. if it does exist (by comparing IDs), we flip
      // the flag to true...
      for(let a = 0; a < returnArray.length; a++ ){
        if(returnArray[a].id === consolidatedArray[i].id){
          existsInNewArray = true;
        }
      }
      // ...and we use that flag here.
      // to the arrays where the pairs weren't found, we need to add them
      // to our consolidated array
      if(!existsInNewArray){
        missingKeys = findMissingKeys(consolidatedArray[i], combinedKeys);
        returnArray.push({...consolidatedArray[i], ...missingKeys });
      }
    }
  }
  return returnArray;
}

/*
  The function below takes in a single object (a user row) and the list of
  all keys that exist in the table. A comparison is done to see which keys
  are missing, and the missing keys will be added with blank data
*/
function findMissingKeys(obj, combinedKeys){
  // returns array of keys
  objKeys = Object.keys(obj);

  let returnObject = {};
  // get back the keys we need to give back, and add them to the return object
  let foundKeys = combinedKeys.filter(function(obj) {
    return objKeys.indexOf(obj) == -1; });

    // let returnObject = {};
    returnObject[item] = " ";
  })

  return returnObject;
}

/*
  The main() function will perform all the steps needed for the table to show.
  This will call on all the functions needed, and sits behind an async
  declaration as this helps us see the Promise data.
*/
async function main() {
  // retrieve API data
  var api1Data = await retrieveAPI(api_1);
  var api2Data = await retrieveAPI(api_2);

  // retrieve the keys from each source. these will be our headers
  var api1Keys = Object.keys(api1Data[0]);
  var api2Keys = Object.keys(api2Data[0]);
  var combinedKeys = [...new Set (api2Keys.concat(api1Keys))];

  // create the consolidated array of objects
  var unsortedReturnArray = mergeArrayObjects(api1Data, api2Data, combinedKeys);
  /*
  // combine all of the data into one consolidated array of objects.
  // this array of objects will have duplicate data, so we'll need to
  // take some steps to remove the duplicates
  let returnArray = [...api1Data, ...api2Data];
  let returnArray2 = [];

  for(let i = 0; i < returnArray.length; i++){
    let found = false;
    if(i+1 <= returnArray.length){
      for(let j = i+1; j < returnArray.length; j++){
        if(returnArray[i].id === returnArray[j].id){
          found = true;
          console.log('return arrays ', returnArray[i], returnArray[j]);
          returnArray2.push({...returnArray[j], ...returnArray[i]});
        }
      }
    }
    if(!found){
      let found2 = false;
      for(let a = 0; a < returnArray2.length; a++ ){
        if(returnArray2[a].id === returnArray[i].id){
          found2 = true;
        }
      }
      // to the arrays where the pairs weren't found, we need to add them
      // with standard mising data keys/values as "".
      if(!found2){
        console.log('remaining array item: ', returnArray[i]);
        missingKeys = findMissingKeys(returnArray[i], combinedKeys);
        returnArray2.push({...returnArray[i], ...missingKeys });
      }
    }
  }
  */


  // one more thing before we pass to table, let's alphabetize our keys so they
  // look in uniform order as we grab them into html table
  var sortedKeys = combinedKeys.sort();

  var sortedReturnArray = [];

  unsortedReturnArray.forEach(item => {
    const ordered = Object.keys(item).sort().reduce(
      (obj, key) => {
        obj[key] = item[key];
        return obj;
      },
      {}
    );
    sortedReturnArray.push({...ordered});
  });

  console.log('sorted return array is', sortedReturnArray);

  var htmlTable = document.getElementById('taskTable');
  let table = document.createElement('table');
  let headerRow = document.createElement('tr');

  sortedKeys.forEach(headerText => {
    let header = document.createElement('th');
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  sortedReturnArray.forEach(item => {
    let row = document.createElement('tr');

    Object.values(item).forEach(text => {
      let cell = document.createElement('td');
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    })
    table.appendChild(row);
  })

  htmlTable.appendChild(table);

  /*
  api1Data.forEach(api1Item => {
    let found = false;
    api2Data.forEach(api2Item => {
      if(api2Item.id === api1Item.id){
        found = true;
        returnArray.push({...api2Item, ...api1Item});
      }

    })
    if(!found){
      returnArray.push({...api1Item});
    }
  })*/
  console.log(returnArray);
  console.log(unsortedReturnArray);
}
main();

// var apiNames = createTable(api_names);
// var apiAges = createTable(api_ages);

// console.log('ageData is', apiAgeData);
// console.log('nameData is', apiNameData);
