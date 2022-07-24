import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  CircularProgress,
  Box,
} from "@material-ui/core";
import axios from "axios";

import FormFirstStep from "./FormFirstStep";
import FormSecondStep from "./FormSecondStep";

const useStyles = makeStyles({
  container: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    fontFamily: '"Open Sans", sans-serif',
  },
  contentWrapper: {
    backgroundColor: "#f7f9fd",
    padding: "2em",
    borderRadius: "10px",
    width: 500,
  },
  spinner: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
  },
});

const OnBoarding = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState(null);
  const classes = useStyles();

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
          type,
        };
      });

      setValues(INITIAL_VALUES);
    })();
  }, []);

  if (!values) {
    return (
      <Box className={classes.spinner}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className={classes.container}>
      <Container className={classes.contentWrapper}>
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
      </Container>
    </Container>
  );
};

export default OnBoarding;
