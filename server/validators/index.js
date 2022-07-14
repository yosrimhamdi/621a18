const fieldsMatch = (allowedFields, postedFields) => {
  return !postedFields
    .map((postedField) => {
      for (const allowedField of allowedFields) {
        if (allowedField.name === postedField.name) {
          return true;
        }
      }

      return false;
    })
    .includes(false);
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

module.exports = { fieldsMatch, hasOnlyNameAndValue, hasCorrectDataType };
