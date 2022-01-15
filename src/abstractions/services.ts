import { AppConfiguration } from ".";
import { AxiosStatic } from "axios";
import { AppConfigurationRenderer } from "./app-configuration-renderer";
import { AppSessionStateAccessor, AppSessionStateMonitor } from "./app-session";
import { DopplerLegacyClient } from "./doppler-legacy-client";
import { HtmlEditorApiClient } from "./html-editor-api-client";

// TODO: Determine if defining this type based on a list of types possible,
// for example based on this type:
// type AppServicesTuple = [ Window, AppConfiguration ]
export type AppServices = {
  window: Window;
  console: Console;
  axiosStatic: AxiosStatic;
  appConfiguration: AppConfiguration;
  appConfigurationRenderer: AppConfigurationRenderer;
  dopplerLegacyClient: DopplerLegacyClient;
  htmlEditorApiClient: HtmlEditorApiClient;
  appSessionStateAccessor: AppSessionStateAccessor;
  appSessionStateMonitor: AppSessionStateMonitor;
};
