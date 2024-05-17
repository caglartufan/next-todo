export function validateTodoTitleAndDescription(
    title?: string,
    description?: string
) {
    const errors: {
        title?: string;
        description?: string;
    } = {};

    if (!title || title === '') {
        errors.title = 'Title must not be empty.';
    } else if (title.length < 5) {
        errors.title = 'Title must contain at least 5 characters.';
    } else if (title.length > 50) {
        errors.title = 'Title must contain at most 50 characters.';
    }

    if (!description || description === '') {
        errors.description = 'Description must not be empty.';
    } else if (description.length < 3) {
        errors.description = 'Description must contain at least 3 characters.';
    } else if (description.length > 250) {
        errors.description = 'Description must contain at most 250 characters.';
    }

    return (errors.title || errors.description) ? errors : undefined;
}
