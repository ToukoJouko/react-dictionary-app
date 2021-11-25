import React from "react";

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div>{message}</div>;
};

export default ErrorMessage;
