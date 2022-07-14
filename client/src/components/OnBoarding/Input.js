import React from "react";

import { isInValidInput } from "./helpers";

const Input = ({ input, values, setValues, hasSubmitted }) => {
  const { name, label, type } = input;

  if (type === "yes-no") {
    return (
      <div
        className={`toggle-switch-container ${
          isInValidInput(values, name) && hasSubmitted
            ? "toggle-switch-container--error"
            : ""
        }`}
      >
        <div
          className={`toggle-switch ${
            values[name].value ? "toggle-switch--checked" : ""
          }`}
          onClick={() => {
            setValues({
              ...values,
              [name]: { ...values[name], value: !values[name].value },
            });
          }}
        ></div>
        {label}
      </div>
    );
  }

  return (
    <div>
      <label className="label">{label}</label>
      <input
        name={name}
        type={type}
        className={`input ${
          isInValidInput(values, name) && hasSubmitted ? "input-error" : ""
        }`}
        value={values[name].value}
        onChange={(e) =>
          setValues({
            ...values,
            [name]: { ...values[name], value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default Input;
