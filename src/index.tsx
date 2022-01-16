import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./components/App";
import { reportWebVitals } from "./reportWebVitals";
import { configureApp } from "./composition-root";
import { AppServicesProvider } from "./components/AppServicesContext";
import { AppSessionStateProvider } from "./components/AppSessionStateContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { broadcastQueryClient } from 'react-query/broadcastQueryClient-experimental'

const customConfiguration =
  (window as any)["editors-webapp-configuration"] || {};

const appServices = configureApp(customConfiguration);

const appSessionStateMonitor = appServices.appSessionStateMonitor;
appSessionStateMonitor.start();

// TODO: consider to move QueryClient configuration to composition-root

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});


const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  buster: "" // TODO: use app version?
});

// broadcastQueryClient({
//   queryClient,
//   broadcastChannel: 'my-app',
// });

render(
  <StrictMode>
    <AppServicesProvider appServices={appServices}>
      <QueryClientProvider client={queryClient}>
        <AppSessionStateProvider
          appSessionStateMonitor={appSessionStateMonitor}
        >
          <BrowserRouter basename={appServices.appConfiguration.basename}>
            <App />
          </BrowserRouter>
        </AppSessionStateProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppServicesProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

