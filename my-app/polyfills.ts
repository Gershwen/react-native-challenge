import 'setimmediate';

import 'react-native-polyfill-globals/auto';


if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (...args: any[]) => {
    return setTimeout(...args);
  };
}
