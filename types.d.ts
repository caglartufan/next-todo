// Helper/utility types
type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// uiSlice related types
type UIState = {
    theme: THEME;
};

// Abstract formSlice related types
type FormNamesAndInputs = {
    [FormName in string]: Array<string>;
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
type FormSlice<Inputs extends Array<string>> = {
    inputs: {
        [InputName in ArrayElement<Inputs>]: InputState;
    };
    isValid: boolean;
};
type FormState<T extends FormNamesAndInputs> = {
    [Property in keyof T]: FormSlice<T[Property]>;
};

// Concrete formSlice related types
type AppFormNamesAndInputs = {
    'add-todo': ['title', 'description'];
    'edit-todo': ['title', 'description'];
};
type AppFormState = FormState<AppFormNamesAndInputs>;
type FormName = keyof AppFormState;
type InputName = keyof AppFormState[keyof AppFormState]['inputs'];

// Serialized model types
type SerializedTodo = Partial<{
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}>;
