import { EventEmitter } from "events";
import { AppServices } from "../../abstractions";
import {
  AppSessionState,
  AppSessionStateMonitor,
  defaultAppSessionState,
} from "../../abstractions/app-session";

const SESSION_STATE_UPDATE = Symbol("SESSION_STATE_UPDATE");

export class PullingAppSessionStateMonitor implements AppSessionStateMonitor {
  private readonly _appSessionStateWrapper;
  private readonly _window;
  private readonly _dopplerLegacyClient;
  private readonly _eventEmitter = new EventEmitter();
  private readonly _keepAliveMilliseconds;

  constructor({
    appSessionStateWrapper,
    appServices: {
      window,
      dopplerLegacyClient,
      appConfiguration: { keepAliveMilliseconds },
    },
  }: {
    appSessionStateWrapper: { current: AppSessionState };
    appServices: AppServices;
  }) {
    this._appSessionStateWrapper = appSessionStateWrapper;
    this._window = window;
    this._dopplerLegacyClient = dopplerLegacyClient;
    this._keepAliveMilliseconds = keepAliveMilliseconds;
  }

  private updateAndEmit(appSessionState: AppSessionState): void {
    this._appSessionStateWrapper.current = appSessionState;
    this._eventEmitter.emit(SESSION_STATE_UPDATE, appSessionState);
  }

  private async fetchDopplerUserData(): Promise<AppSessionState> {
    try {
      const result = await this._dopplerLegacyClient.getDopplerUserData();

      if (result.success) {
        return {
          status: "authenticated",
          jwtToken: result.value.jwtToken,
          dopplerAccountName: result.value.user.email,
          unlayerUser: result.value.unlayerUser,
        };
      }

      // result.notAuthenticated)
      return { status: "non-authenticated" };
    } catch (e) {
      // Really unexpected
      console.error({ unexpectedError: e });
      return { status: "non-authenticated" };
    }
  }

  async start(): Promise<void> {
    this.updateAndEmit(defaultAppSessionState);
    this._window.setInterval(async () => {
      this.updateAndEmit(await this.fetchDopplerUserData());
    }, this._keepAliveMilliseconds);
    this.updateAndEmit(await this.fetchDopplerUserData());
  }

  onSessionUpdate(listener: (appSessionState: AppSessionState) => void): void {
    this._eventEmitter.on(SESSION_STATE_UPDATE, listener);
  }
}
