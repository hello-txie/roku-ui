import React from "react";
import ReactDOM from "react-dom/client";
import App from '@app/index';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "./keycloak";

if (process.env.NODE_ENV !== "production") {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000, config);
}

const tokenLogger = (tokens) => {
  sessionStorage.setItem("token", tokens.token);
}

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <ReactKeycloakProvider authClient={keycloak} onTokens={tokenLogger}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactKeycloakProvider>
)
