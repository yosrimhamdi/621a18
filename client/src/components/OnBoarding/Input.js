import React from "react";
import { Switch, FormControlLabel, TextField } from "@material-ui/core";

import { isInValidInput } from "./helpers";

const Input = ({ input, values, setValues, hasSubmitted }) => {
  const { name, label, type } = input;

  if (type === "yes-no") {
    return (
      <FormControlLabel
        label={label}
        control={
          <Switch
            color="primary"
            checked={values[name].value}
            onChange={() => {
              setValues({
                ...values,
                [name]: { ...values[name], value: !values[name].value },
              });
            }}
          />
        }
      />
    );
  }

  return (
    <TextField
      color="primary"
      style={{ marginBottom: "2em" }}
      label={label}
      name={name}
      variant="standard"
      fullWidth
      multiline={type === "multiline-text"}
      error={isInValidInput(values, name) && hasSubmitted}
      value={values[name].value}
      rows="5"
      onChange={(e) =>
        setValues({
          ...values,
          [name]: { ...values[name], value: e.target.value },
        })
      }
    />
  );
};

export default Input;
