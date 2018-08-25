let createFrom = (formValue) => {

    return {
        getInvalidPaths: (validators) => {

            let inValidPaths = [];

            for (let validatorKey in validators) {
                let formPathValue = formValue[validatorKey];
                let validatesFunc = validators[validatorKey];

                for (let validFunc of validatesFunc) {
                    let result = validFunc(formPathValue);
                    if (!result) {
                        inValidPaths.push(validatorKey);
                        break;
                    }
                }
            }

            return inValidPaths
        },

    }
};

export {
    createFrom
}
