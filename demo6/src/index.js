// import { log } from './logger';
// import message from './message';

// const msg = message.hi;

// log(msg)

import('./logger').then((mod) => {
  const { log } = mod;
  log('code splitting')
})
