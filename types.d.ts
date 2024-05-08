type UIState = {
    theme: THEME;
};

type InputState = {
    label: string;
    value: string;
    isTouched: boolean;
    isValid: boolean;
    validators?: {
        required?: boolean;
        min?: number;
        max?: number;
        minlength?: number;
        maxlength?: number;
    };
    error?: string;
};

type FormSlice<FormInputs extends string> = {
    inputs: {
        [Property in FormInputs]: InputState;
    };
    success: boolean;
    isValid: boolean;
};

type SerializedTodo = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};
