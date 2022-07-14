import React, { useState } from "react";

import Input from "./Input";
import { isFormValid } from "./helpers";

const FormFirstStep = ({ inputs, setCurrentStep, values, setValues }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isFormValid(inputs, values)) {
      return;
    }

    setCurrentStep(2);
  };

  const renderedInputs = inputs.map((input, i) => (
    <Input
      key={i}
      input={input}
      values={values}
      setValues={setValues}
      hasSubmitted={hasSubmitted}
    />
  ));

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <div>{renderedInputs}</div>
      {hasSubmitted && !isFormValid(inputs, values) && (
        <div className="error-message">
          Please fill out all required fields before proceeding
        </div>
      )}
      <button
        className={`button button--right ${
          isFormValid(inputs, values) ? "button--valid" : ""
        }`}
      >
        Next
      </button>
    </form>
  );
};

export default FormFirstStep;
