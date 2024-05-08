import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './slices/uiSlice';
import { addTodoFormReducer } from './slices/addTodoFormSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        addTodoForm: addTodoFormReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
