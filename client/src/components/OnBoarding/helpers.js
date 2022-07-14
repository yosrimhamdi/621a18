export const isInValidInput = (values, inputName) => {
  return values[inputName].required && !values[inputName].value;
};

export const isFormValid = (inputs, values) => {
  for (const input of inputs) {
    if (isInValidInput(values, input.name)) {
      return false;
    }
  }

  return true;
};
