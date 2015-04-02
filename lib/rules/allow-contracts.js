/**
 * @fileoverview Avoid using class inheritance, instead favor prototypes or object composition.
 * @author Nicola Molinari
 * @copyright 2015 Nicola Molinari. All rights reserved.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {

    'Program': function(node) {
      console.log('hello');
    }

  };
};
