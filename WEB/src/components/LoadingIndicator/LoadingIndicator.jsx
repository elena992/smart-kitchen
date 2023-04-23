import React from "react";
import "./LoadingIndicator.css";
import { Ring } from "@uiball/loaders";

const LoadingIndicator = () => {
  return <Ring size={40} lineWeight={5} speed={2} color="black" />;
};

export default LoadingIndicator;
