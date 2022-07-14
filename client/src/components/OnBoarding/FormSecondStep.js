import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "./Input";
import { isFormValid } from "./helpers";

const FormSecondStep = ({ inputs, setCurrentStep, values, setValues }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isFormValid(inputs, values)) {
      return;
    }

    history.push("/home");
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
      <div className="inputs-wrapper">{renderedInputs}</div>
      {hasSubmitted && !isFormValid(inputs, values) && (
        <div className="error-message">
          Please fill out all required fields before proceeding
        </div>
      )}
      <div className="buttons-wrapper">
        <button
          type="button"
          className="button button--valid"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </button>
        <button
          className={`button ${
            isFormValid(inputs, values) ? "button--valid" : ""
          }`}
        >
          Finish
        </button>
      </div>
    </form>
  );
};

export default FormSecondStep;
