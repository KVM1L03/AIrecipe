import { configureStore } from '@reduxjs/toolkit';
import calorieReducer from './calorieSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, calorieReducer);
  
  export const store = configureStore({
    reducer: {
      calorie: persistedReducer,
    },
  });
  
  export const persistor = persistStore(store);
