import React, { useState } from "react";
import { Button, Container, Box } from "@material-ui/core";

import Input from "./Input";
import { isFormValid } from "./helpers";
import ErrorMessage from "./ErrorMessage";

const FormFirstStep = ({ inputs, setCurrentStep, values, setValues }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onNextButtonClick = () => {
    setHasSubmitted(true);

    if (!isFormValid(inputs, values)) {
      return;
    }

    setCurrentStep(2);
  };

  const renderedInputs = inputs.map((input) => (
    <Input
      key={input.name}
      input={input}
      values={values}
      setValues={setValues}
      hasSubmitted={hasSubmitted}
    />
  ));

  return (
    <>
      <Container disableGutters>{renderedInputs}</Container>
      <ErrorMessage showError={hasSubmitted && !isFormValid(inputs, values)} />
      <Box sx={{ textAlign: "right" }}>
        <Box sx={{ display: "inline-block" }} onClick={onNextButtonClick}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid(inputs, values)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormFirstStep;
