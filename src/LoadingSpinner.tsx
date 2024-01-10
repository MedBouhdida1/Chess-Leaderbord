import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" data-testid="loading">
      <div className="loading-spinner"></div>
    </div>
  );
}