import React, { useEffect, useState } from "react";
import axios from "axios";

import FormFirstStep from "./FormFirstStep";
import FormSecondStep from "./FormSecondStep";
import spinner from "./spinner.svg";

import "./OnBoarding.css";

const OnBoarding = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/onboarding");
      const { steps } = response.data;

      setSteps(response.data.steps);

      const INITIAL_VALUES = {};

      [...steps[0], ...steps[1]].forEach((input) => {
        const { name, type, required } = input;

        INITIAL_VALUES[name] = {
          required,
          value: type === "yes-no" ? false : "",
        };
      });

      setValues(INITIAL_VALUES);
    })();
  }, []);

  if (!values) {
    return (
      <div className="spinner-container">
        <img src={spinner} alt="spinner" className="spinner" />
      </div>
    );
  }

  return (
    <div className="on-boarding">
      {currentStep === 1 ? (
        <FormFirstStep
          values={values}
          setValues={setValues}
          setCurrentStep={setCurrentStep}
          inputs={steps[0]}
        />
      ) : (
        <FormSecondStep
          values={values}
          setValues={setValues}
          setCurrentStep={setCurrentStep}
          inputs={steps[1]}
        />
      )}
    </div>
  );
};

export default OnBoarding;
