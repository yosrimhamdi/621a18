const isMissingRequiredField = (allowedFields, postedFields) => {
  const requiredFields = allowedFields.filter((field) => field.required);

  return requiredFields
    .map((requiredField) => {
      return postedFields.find((field) => field.name === requiredField.name);
    })
    .includes(undefined);
};

const hasOnlyNameAndValue = (postedFields) => {
  for (const field of postedFields) {
    const keys = Object.keys(field);

    if (
      !keys.includes("name") ||
      !keys.includes("value") ||
      keys.length !== 2
    ) {
      return false;
    }
  }

  return true;
};

const hasCorrectDataType = (allowedFields, postedFields) => {
  return !postedFields
    .map(({ value, name }) => {
      const field = allowedFields.find((field) => field.name === name);

      switch (field.type) {
        case "text":
        case "multiline-text":
          return typeof value === "string" || value instanceof String;
        case "yes-no":
          return typeof value == "boolean";
        default:
          return false;
      }
    })
    .includes(false);
};

module.exports = {
  isMissingRequiredField,
  hasOnlyNameAndValue,
  hasCorrectDataType,
};
