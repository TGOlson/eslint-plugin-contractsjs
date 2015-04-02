module.exports = {
  preprocess: function(rawText, filename) {
    var textSegments = rawText.split('\n');
    // console.log(textSegments);

    var mappedSegments = textSegments.map(sanatizeContracts);

    return [mappedSegments.join('\n')];
  },
  postprocess: function(messages, filename) {

    var merged = [].concat.apply([], messages);
    console.log(merged, filename);

    return merged;
  }
}


function sanatizeContracts(text) {
  if(isContract(text)) {
    // return sanatizeContract(text);
    return '';
  } else if(isContractImport(text)) {
    return '';
  } else {
    return text;
  }
}

function sanatizeContract(text) {
  var contractVariables = stripKeyWords(text);

  contractVariables = contractVariables.split(' ').filter(function(item) {
    return item !== '';
  }).join(', ');

  console.log(contractVariables);

  var iifeWithVars = '(function(){}(' + contractVariables + '));';

  return iifeWithVars;
}

// Removes '@ (' and ') -> '
function stripContractSyntax(text) {
  return text
    .replace(/@ \(/, '')
    .replace(/\) -> /, '');
}

function stripKeyWords(text) {
  return text
    .replace(/@ \(/, '')
    .replace(/\) -> /, '')
    .replace('Bool', '')
    .replace('Void', '')
    .replace('or', '');
    // .replace(/\(/, '')
    // .replace(/\)/, '');
}

function isContract(text) {
  return text.indexOf('@') === 0;
}

function isContractImport(text) {
  return text === 'import @ from \'contracts.js\'';
}

// 4.1 Basic Contracts
// Contracts.js comes with a number of basic contracts that check for first-order properties (things like typeof checks).

// http://www.contractsjs.org/#basic-contracts
// Contract	Description
// Num	A value that is typeof number
// Str	A value that is typeof string
// Bool	A value that is typeof boolean
// Odd	A value that is odd (val % 2 === 1)
// Even	A value that is even (val % 1 === 0)
// Pos	A positive number(val >= 0)
// Nat	A natural number (val > 0)
// Neg	A negative number (val < 0)
// Any	Any value
// None	No value (not terribly useful)
// Null	The null value
// Undefined	The undefined value
// Void	Either null or undefined
