import React from "react";
import { Typography } from "@material-ui/core";

const ErrorMessage = ({ showError }) => {
  if (showError) {
    return (
      <Typography color="error" gutterBottom>
        Please fill out all required fields before proceeding
      </Typography>
    );
  }

  return null;
};

export default ErrorMessage;
