import { AppServices } from "../abstractions";

export type ServicesFactories = {
  [Property in keyof AppServices as `${string & Property}Factory`]: (
    appServices: AppServices
  ) => AppServices[Property];
};

export class SingletonLazyAppServicesContainer implements AppServices {
  private readonly _instances: Partial<AppServices> = {};
  private readonly _factories: ServicesFactories;

  constructor(factories: ServicesFactories) {
    this._factories = { ...factories };
  }

  private singleton<N extends keyof AppServices, T extends AppServices[N]>(
    name: N
  ): T {
    if (!this._instances[name]) {
      this._instances[name] = this._factories[`${name}Factory`](this) as T;
    }
    return this._instances[name] as T;
  }

  // TODO: generate these properties automatically
  get window() {
    return this.singleton("window");
  }

  get appConfiguration() {
    return this.singleton("appConfiguration");
  }

  get appConfigurationRenderer() {
    return this.singleton("appConfigurationRenderer");
  }

  get dopplerLegacyClient() {
    return this.singleton("dopplerLegacyClient");
  }

  get appSessionStateAccessor() {
    return this.singleton("appSessionStateAccessor");
  }

  get appSessionStateMonitor() {
    return this.singleton("appSessionStateMonitor");
  }

  get axiosStatic() {
    return this.singleton("axiosStatic");
  }

  get htmlEditorApiClient() {
    return this.singleton("htmlEditorApiClient");
  }

  get queryClient() {
    return this.singleton("queryClient");
  }

  get getCampaignContentQueryClient() {
    return this.singleton("getCampaignContentQueryClient");
  }
}
