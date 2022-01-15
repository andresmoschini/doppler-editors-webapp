import axios from "axios";
import { AppConfiguration, AppServices } from "./abstractions";
import { defaultAppSessionState } from "./abstractions/app-session/app-session-state";
import { AppConfigurationRendererImplementation } from "./implementations/app-configuration-renderer";
import {
  //
  PullingAppSessionStateMonitor,
} from "./implementations/app-session/pulling-app-session-state-monitor";
import {
  ServicesFactories,
  SingletonLazyAppServicesContainer,
} from "./implementations/SingletonLazyAppServicesContainer";
import { defaultAppConfiguration } from "./default-configuration";
import { DopplerLegacyClientImpl } from "./implementations/DopplerLegacyClientImpl";
import { DummyDopplerLegacyClient } from "./implementations/dummies/doppler-legacy-client";
import { DummyHtmlEditorApiClient } from "./implementations/dummies/html-editor-api-client";
import { HtmlEditorApiClientImpl } from "./implementations/HtmlEditorApiClientImpl";

export const configureApp = (
  customConfiguration: Partial<AppConfiguration>
): AppServices => {
  const appConfiguration = {
    ...defaultAppConfiguration,
    ...customConfiguration,
  };

  const appSessionStateWrapper = {
    current: defaultAppSessionState,
  };

  const realFactories: ServicesFactories = {
    windowFactory: () => window,
    consoleFactory: () => console,
    axiosStaticFactory: () => axios,
    appConfigurationFactory: () => appConfiguration,
    appConfigurationRendererFactory: (appServices: AppServices) =>
      new AppConfigurationRendererImplementation(appServices),
    dopplerLegacyClientFactory: (appServices: AppServices) =>
      new DopplerLegacyClientImpl({
        axiosStatic: appServices.axiosStatic,
        appConfiguration: appServices.appConfiguration,
        console: appServices.console
      }),
    htmlEditorApiClientFactory: (appServices) =>
      new HtmlEditorApiClientImpl({
        axiosStatic: appServices.axiosStatic,
        appSessionStateAccessor: appServices.appSessionStateAccessor,
        appConfiguration: appServices.appConfiguration,
      }),
    appSessionStateAccessorFactory: () => appSessionStateWrapper,
    appSessionStateMonitorFactory: (appServices: AppServices) =>
      new PullingAppSessionStateMonitor({
        appSessionStateWrapper,
        appServices,
      }),
  };

  const dummyFactories: Partial<ServicesFactories> = {
    dopplerLegacyClientFactory: () => new DummyDopplerLegacyClient(),
    htmlEditorApiClientFactory: () => new DummyHtmlEditorApiClient(),
  };

  const factories = appConfiguration.useDummies
    ? { ...realFactories, ...dummyFactories }
    : realFactories;

  const appServices = new SingletonLazyAppServicesContainer(factories);

  return appServices;
};
