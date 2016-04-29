function isObject(value) {
    return typeof value === 'object';
}

function hasError(field) {
    if(isObject(field)) {
        var fieldErrorsKeys = Object.keys(field);

        return fieldErrorsKeys.some(fieldErrorKey => hasError(field[fieldErrorKey]));
    } else {
        return field;
    }
}

export function hasAnyErrorsSet(errors) {
    if(typeof errors !== 'object') {
        return false;
    }

    return Object.keys(errors).some(errorKey => hasError(errors[errorKey]));
}
