(function () {
  'use strict';

  const log = msg => {
    console.log('------INFO-------');
    console.log(msg);
    console.log('-----------------');
  };

  var message = {
    hi: 'rollup hello'
  };

  const msg = message.hi;

  log(msg);

})();
