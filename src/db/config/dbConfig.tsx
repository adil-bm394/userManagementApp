import localForage from 'localforage';

localForage.config({
  name: 'userAuthDB',
  storeName: 'users',
});

export default localForage;
