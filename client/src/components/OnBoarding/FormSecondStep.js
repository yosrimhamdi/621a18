import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Container, Box } from "@material-ui/core";

import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import { isFormValid } from "./helpers";

const FormSecondStep = ({ inputs, setCurrentStep, values, setValues }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();

  const onFinishButtonClick = () => {
    setHasSubmitted(true);

    if (!isFormValid(inputs, values)) {
      return;
    }

    history.push("/home");
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
      <ButtonGroup
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5em",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </Button>
        <Box sx={{ display: "inline-block" }} onClick={onFinishButtonClick}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid(inputs, values)}
          >
            Finish
          </Button>
        </Box>
      </ButtonGroup>
    </>
  );
};

export default FormSecondStep;
