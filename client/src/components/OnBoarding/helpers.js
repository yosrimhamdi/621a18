export const isInValidInput = (values, inputName) => {
  const { required, value, type } = values[inputName];

  return required && !value && type !== "yes-no";
};

export const isFormValid = (inputs, values) => {
  for (const input of inputs) {
    if (isInValidInput(values, input.name)) {
      return false;
    }
  }

  return true;
};
