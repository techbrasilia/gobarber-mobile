import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage' //isso no web;
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarberfabio',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
