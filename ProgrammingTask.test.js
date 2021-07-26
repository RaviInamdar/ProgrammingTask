//grab all the functions we're trying to test so we can refer them
const {
  retrieveAPI,
  mergeArrayObjects,
  sortReturnArray,
  findMissingKeys
} = require('./ProgrammingTask');

/* findMissingKeys(), 3 scenarios:
  1. there are some missing keys, some existing
  2. there are ALL missing keys, so everything returns
  3. there are NO missing keys, so nothing returns
*/
test('finds some missing keys', () => {
  let obj = {
    testing: 'testing',
    this: 'this',
    function: 'function'
  };
  let combinedKeys = ['testing', 'if', 'this', 'works'];
  expect(
    findMissingKeys(obj, combinedKeys)
  ).toStrictEqual(
    {"if": " ", "works": " "}
  );
});

test('finds ALL keys to be missing', () => {
  let obj = {
    no: 'testing',
    keys: 'this',
    here: 'function'
  };
  let combinedKeys = ['testing', 'if', 'this', 'works'];
  expect(
    findMissingKeys(obj, combinedKeys)
  ).toStrictEqual(
    {"if": " ", "testing": " ", "this": " ", "works": " "}
  );
});

test('finds NO keys to be missing', () => {
  let obj = {
    testing: 'data',
    if: 'data',
    this: 'data',
    works: 'data'
  };
  let combinedKeys = ['testing', 'if', 'this', 'works'];
  expect(
    findMissingKeys(obj, combinedKeys)
  ).toStrictEqual(
    {}
  );
});

/* sortReturnArray()
  There is only one possible solution, that is a sorted return array
  alphabetically. we will put in an unsorted array of object keys
  and expect the same array of objects, but the keys are sorted in
  alphabetical order.
*/
test('sortReturnArray with blank array of object', () => {
  expect(
    sortReturnArray([{}])
  ).toStrictEqual(
    [{}]
  );
});

test('sortReturnArray with unsorted array of objects returns sorted', () => {
  let unsortedArray = [
    {
      c: 'data',
      b: 'data',
      a: 'data',
      z: 'data',
    },
    {
      c: 'data',
      a: 'data',
      b: 'data',
      z: 'data',
    },
    {
      a: 'data',
      c: 'data',
      b: 'data',
      z: 'data',
    }
  ]
  expect(
    sortReturnArray(unsortedArray)
  ).toStrictEqual(
    [
      {
        a: 'data',
        b: 'data',
        c: 'data',
        z: 'data',
      },
      {
        a: 'data',
        b: 'data',
        c: 'data',
        z: 'data',
      },
      {
        a: 'data',
        b: 'data',
        c: 'data',
        z: 'data',
      }
    ]
  );
});

/* mergeArrayObjects()
  This function merges together two arrays and combines objects with the same
  id's.
  There's a few cases here that we can test:
  1. none of the id's in the two arrays match. this causes no merging of two
  arrays, and just creates a new array of combined items
  2. some of hte id's in the two arrays match. this causes partial merging
  of the two arrays.
  3. all of the id's in the two arrays match. this causes simply a merging
  of two arrays, with no new array items being created.
*/
let combinedKeys = ['id', 'key2', 'key3'];
test('mergeArrayObjects with neither incoming data having matching ids', () => {
  let api1Data = [
    {
      id: '1',
      key2: 'data',
    },
    {
      id: '3',
      key2: 'data',
    },
    {
      id: '5',
      key2: 'data',
    }
  ];
  let api2Data = [
    {
      id: '2',
      key3: 'data',
    },
    {
      id: '4',
      key3: 'data',
    },
    {
      id: '6',
      key3: 'data',
    }
  ];
  expect(
    mergeArrayObjects(api1Data, api2Data, combinedKeys)
  ).toStrictEqual(
    [
      {
        id: '1',
        key2: 'data',
        key3: ' ',
      },
      {
        id: '3',
        key2: 'data',
        key3: ' ',
      },
      {
        id: '5',
        key2: 'data',
        key3: ' ',
      },
      {
        id: '2',
        key3: 'data',
        key2: ' ',
      },
      {
        id: '4',
        key3: 'data',
        key2: ' ',
      },
      {
        id: '6',
        key3: 'data',
        key2: ' ',
      }
    ]
  );
});

test('mergeArrayObjects with incoming data having some matching ids', () => {
  let api1Data = [
    {
      id: '1',
      key2: 'data',
    },
    {
      id: '3',
      key2: 'data',
    },
    {
      id: '6',
      key2: 'data',
    }
  ];
  let api2Data = [
    {
      id: '2',
      key3: 'data',
    },
    {
      id: '4',
      key3: 'data',
    },
    {
      id: '6',
      key3: 'data',
    }
  ];
  expect(
    mergeArrayObjects(api1Data, api2Data, combinedKeys)
  ).toStrictEqual(
    [
      {
        id: '1',
        key2: 'data',
        key3: ' ',
      },
      {
        id: '3',
        key2: 'data',
        key3: ' ',
      },
      {
        id: '6',
        key3: 'data',
        key2: 'data',
      },
      {
        id: '2',
        key3: 'data',
        key2: ' ',
      },
      {
        id: '4',
        key3: 'data',
        key2: ' ',
      }
    ]
  );
});

test('mergeArrayObjects with incoming data having all matching ids', () => {
  let api1Data = [
    {
      id: '1',
      key2: 'data',
    },
    {
      id: '3',
      key2: 'data',
    },
    {
      id: '5',
      key2: 'data',
    }
  ];
  let api2Data = [
    {
      id: '1',
      key3: 'data',
    },
    {
      id: '3',
      key3: 'data',
    },
    {
      id: '5',
      key3: 'data',
    }
  ];
  expect(
    mergeArrayObjects(api1Data, api2Data, combinedKeys)
  ).toStrictEqual(
    [
      {
        id: '1',
        key2: 'data',
        key3: 'data',
      },
      {
        id: '3',
        key2: 'data',
        key3: 'data',
      },
      {
        id: '5',
        key3: 'data',
        key2: 'data',
      },
    ]
  );
});

/*
  retrieveAPI test to resolve data
*/
test('the data is resolving', () => {
  expect(retrieveAPI()).resolves.toBe('resolved data');
});
