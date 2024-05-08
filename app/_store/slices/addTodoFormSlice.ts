import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AddTodoFormInputs = 'title' | 'description';

const initialState: FormSlice<AddTodoFormInputs> = {
    inputs: {
        title: {
            label: 'Title',
            value: '',
            isTouched: false,
            isValid: false,
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
            validators: {
                required: true,
                minlength: 3,
                maxlength: 250,
            },
        },
    },
    success: false,
    isValid: false,
};

const addTodoFormSlice = createSlice({
    name: 'add-todo-form',
    initialState,
    reducers: {
        changeInput: (
            state,
            action: PayloadAction<{
                inputName: string;
                value: string;
            }>
        ) => {
            let { inputName, value } = action.payload;

            if(!(inputName in state.inputs)) {
                return;
            }

            state.inputs[inputName as AddTodoFormInputs].value = value.trim();

            addTodoFormSlice.caseReducers.validateInput(state, {
                payload: { inputName },
                type: addTodoFormActions.validateInput.type,
            });
        },
        validateInput: (
            state,
            action: PayloadAction<{ inputName: string }>
        ) => {
            const { inputName } = action.payload;

            if(!(inputName in state.inputs)) {
                return;
            }

            const inputState = state.inputs[inputName as AddTodoFormInputs];
            const { label, validators, value } = inputState;

            if (!validators) {
                return;
            }

            let isValid = false;
            if (validators.required && value === '') {
                inputState.error = `${label} must not be empty.`;
            } else if (
                validators.minlength &&
                validators.minlength > 0 &&
                value.length < validators.minlength
            ) {
                inputState.error = `${label} must contain at least ${validators.minlength} characters.`;
            } else if (
                validators.maxlength &&
                validators.maxlength > 0 &&
                value.length > validators.maxlength
            ) {
                inputState.error = `${label} must contain at most ${validators.maxlength} characters.`;
            } else {
                inputState.error = undefined;
                isValid = true;
            }

            inputState.isValid = isValid;
            state.isValid = Object.values(state.inputs)
                .map((eachInputState) => eachInputState.isValid)
                .reduce(
                    (prevIsValid, currIsValid) => prevIsValid && currIsValid,
                    true
                );
        },
        inputTouched: (
            state,
            action: PayloadAction<{ inputName: string }>
        ) => {
            const { inputName } = action.payload;

            if(!(inputName in state.inputs)) {
                return;
            }

            state.inputs[inputName as AddTodoFormInputs].isTouched = true;
        },
        resetForm: () => initialState,
        setSuccess: (state) => {
            state.success = true;
        }
    },
});

export const addTodoFormActions = addTodoFormSlice.actions;
export const addTodoFormReducer = addTodoFormSlice.reducer;
