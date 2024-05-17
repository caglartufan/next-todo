import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './slices/uiSlice';
import { formReducer } from './slices/formSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        form: formReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
