//grab all the functions we're trying to test so we can refer them
const {
  retrieveAPI,
  mergeArrayObjects,
  sortReturnArray,
  findMissingKeys
} = require('./ProgrammingTask');

test('finds missing keys', () => {

  expect(findMissingKeys({}, [])).toBe([]);
});
