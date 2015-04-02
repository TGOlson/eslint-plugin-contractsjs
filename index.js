'use strict';

module.exports = {
  rules: {
    'allow-contracts': require('./lib/rules/allow-contracts')
  },
  rulesConfig: {
    'allow-contracts': 2
  },
  processors: {
    '.sjs': require('./lib/processors/sjs-processor')
  }
};
