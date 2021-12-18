import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { reportWebVitals } from "./reportWebVitals";
import { AppServicesProvider, configureApp } from "./app-composition";

const configuration = {
  // TODO: remove this after update the HTMLs:
  ...{ basename: (window as any).basename || undefined },
  ...((window as any)["editors-webapp-configuration"] || {}),
};
const appServices = configureApp(configuration);

render(
  <StrictMode>
    <AppServicesProvider appServices={appServices}>
      <BrowserRouter basename={appServices.appConfiguration.basename}>
        <App />
      </BrowserRouter>
    </AppServicesProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
