import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { ChatBotSettings, ActionResult, ApplicationEnvironment } from '../shared';
import { UserInfoService } from '../../userinfo/user-info.service';
import { EmployeeProfileDTO } from '../shared.module';
import { CommonDataService } from '../common-data/common-data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var koreBot: any;

@Injectable()
export class ChatBotService {
  private _useChatBot: boolean;
  private _settings: ChatBotSettings;
  private _activated: boolean = false;
  private _serviceIsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private injector: Injector,
    private _commonDataService: CommonDataService,
    private _userInfoService: UserInfoService,
    private _authService: AuthService
  ) {
    // Get our environment
    const environment: ApplicationEnvironment = this.injector.get('ENVIRONMENT');

    // Get our default settings
    this._useChatBot = environment.useChatBot;
    this._settings = environment.chatBotSettings;
    this._settings.botOptions.botInfo.customData = {
      IsImpersonating: false
    };

    this._initializeService();
  }

  public show(): void {
    if (!this._activated && this._useChatBot) {
      this._serviceIsReady
        .skipWhile(result => result === false)
        .first()
        .subscribe(result => {
          if (result) {
            koreBot.show(this._settings);
            this._activated = true;
          }
        });
    }
  }

  public destroy(): void {
    if (this._activated) {
      this._activated = false;
      koreBot.destroy();
    }
  }

  private _isImpersonating(): boolean {
    const userId = this._commonDataService.impersonateUserID$.value;
    if ((userId) && (userId.trim().length)) {
      return true;
    }
    return false;
  }

  private _initializeService() {
    // Get auth token
    this._authService.isLoggedIn().subscribe(loggedIn => {
        if (loggedIn) {
         this._settings.botOptions.botInfo.customData.AuthToken = this._authService.getAuthorizationHeaderValue();
         this._listenForNewUser();
        }
      });

    // Set up impersonation listeners, so we know when to reset data for a new user
    this._commonDataService.impersonateUserID$
      .skip(1)
      .distinctUntilChanged()
      .subscribe(userID => {
        this._resetAllData();
      });
  }

  private _listenForNewUser() {
    // Update custom data as user changes
    this._userInfoService.getUserInfo()
      .filter(userInfo => userInfo !== null)
      .subscribe((userInfo: EmployeeProfileDTO) => {
        this._settings.botOptions.userIdentity = userInfo.ECAID;
        this._settings.botOptions.botInfo.customData.EMPLID = userInfo.EMPLID;
        this._settings.botOptions.botInfo.customData.UserName = userInfo.ECAID;
        this._settings.botOptions.botInfo.customData.FullName = userInfo.FullNamePrintable;
        this._settings.botOptions.botInfo.customData.IsImpersonating = this._isImpersonating();
        if (this._settings.botOptions.botInfo.customData.AuthToken) {
          this._serviceIsReady.next(true);
        }
      });
  }

  private _resetAllData() {
    // Close chatbot window
    this.destroy();
    // Clear chatbot user identity
    this._settings.botOptions.userIdentity = null;
    // Clear out any subscriptions
    this._serviceIsReady.complete();
    this._serviceIsReady = new BehaviorSubject<boolean>(false);
  }
}
