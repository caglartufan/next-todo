import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppFormState = {
    'add-todo': {
        inputs: {
            title: {
                label: 'Title',
                value: '',
                isTouched: false,
                isValid: false,
                error: '',
                validators: {
                    required: true,
                    minlength: 3,
                    maxlength: 50,
                },
            },
            description: {
                label: 'Description',
                value: '',
                isTouched: false,
                isValid: false,
                error: '',
                validators: {
                    required: true,
                    minlength: 3,
                    maxlength: 250,
                },
            },
        },
        isValid: false,
    },
    'edit-todo': {
        inputs: {
            title: {
                label: 'Title',
                value: '',
                isTouched: false,
                isValid: false,
                error: '',
                validators: {
                    required: true,
                    minlength: 3,
                    maxlength: 50,
                },
            },
            description: {
                label: 'Description',
                value: '',
                isTouched: false,
                isValid: false,
                error: '',
                validators: {
                    required: true,
                    minlength: 3,
                    maxlength: 250,
                },
            },
        },
        isValid: false,
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        changeInput: (
            state,
            action: PayloadAction<{
                formName: FormName;
                inputName: InputName;
                value: string;
            }>
        ) => {
            let { formName, inputName, value } = action.payload;

            state[formName].inputs[inputName].value = value;

            formSlice.caseReducers.validateInput(state, {
                payload: { formName, inputName },
                type: formSlice.actions.validateInput.type,
            });
        },
        validateInput: (
            state,
            action: PayloadAction<{ formName: FormName; inputName: InputName }>
        ) => {
            const { formName, inputName } = action.payload;

            const inputState = state[formName].inputs[inputName];
            const { label, validators, value } = inputState;
            const trimmedValue = value.trim();

            if (!validators) {
                return;
            }

            let isValid = false;
            if (validators.required && trimmedValue === '') {
                inputState.error = `${label} must not be empty.`;
            } else if (
                validators.minlength &&
                validators.minlength > 0 &&
                trimmedValue.length < validators.minlength
            ) {
                inputState.error = `${label} must contain at least ${validators.minlength} characters.`;
            } else if (
                validators.maxlength &&
                validators.maxlength > 0 &&
                trimmedValue.length > validators.maxlength
            ) {
                inputState.error = `${label} must contain at most ${validators.maxlength} characters.`;
            } else {
                inputState.error = undefined;
                isValid = true;
            }

            inputState.isValid = isValid;
            state[formName].isValid = Object.values(state[formName].inputs)
                .map((eachInputState) => eachInputState.isValid)
                .reduce(
                    (prevIsValid, currIsValid) => prevIsValid && currIsValid,
                    true
                );
        },
        inputTouched: (
            state,
            action: PayloadAction<{
                formName: FormName;
                inputName: InputName;
            }>
        ) => {
            const { formName, inputName } = action.payload;

            state[formName].inputs[inputName].isTouched = true;
        },
        resetForm: (state, action: PayloadAction<{ formName: FormName }>) => {
            const { formName } = action.payload;

            state[formName].inputs = initialState[formName].inputs;
            state[formName].isValid = initialState[formName].isValid;
        },
    },
});

export const formActions = formSlice.actions;
export const formReducer = formSlice.reducer;
