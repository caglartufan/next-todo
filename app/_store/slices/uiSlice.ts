import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { THEME } from '@/common';

const initialState: UIState = {
    theme: THEME.LIGHT,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<{ theme: THEME }>) => {
            const targetTheme = action.payload.theme;
            state.theme = targetTheme;
            localStorage.setItem('theme', targetTheme);
        },
    },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
