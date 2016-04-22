export const STEP_SET = 'STEP_SET';

export const setStep = (pollName, step) => {
    return {
        type: STEP_SET,
        pollName: pollName,
        step: step
    };
};