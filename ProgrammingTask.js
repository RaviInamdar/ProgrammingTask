// first, we want to get the URLs into our JS and save them as variables to refer to them later

// we store these variables as constants because during the execution of the program, we do not expect the URLs to change

const api_ages =
      'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/ages';

const api_names =
      'http://5c37c33f7820ff0014d927c5.mockapi.io/msr/names';

async function retrieveAPI(url){
	const response = await fetch(url);
  var data = await response.json();
  console.log('data is', data);
}
retrieveAPI(api_ages);

// declare name and age data in memory
// var ageData = retrieveAPI(api_ages);
// var nameData = retrieveAPI(api_names);

// console.log('ageData is', ageData);
// console.log('nameData is', nameData);
