/* eslint-disable */
/* eslint-disable no-unused-expressions */
import { html, css, LitElement } from '../web_modules/lit-element.js';
import { nothing } from '../web_modules/lit-html.js';
import { unsafeHTML } from '../util/lithtml-unsafeHTML.js';
import log from '../util/log.js';
import AuthUserProfile from './models/userProfile.js';
import baseButtonStyles from '../shared-styles/button-base.js';
import PromptLinkAccount from './components/prompts/promptLinkAccount.js';
import promptWelcomeNewUser from './components/prompts/promptWelcomeNewUser.js';
import './components/ia-google-auth/ia-google-auth.js';
import './components/core-user-settings/core-user-settings.js';
import SigninService from './api.js';
const { actions } = SigninService;

/**
 * Hides pertinent light DOM
 * @param { boolean } keepHeaderVisible - if true, keeps signup/login page header visible
 */
const hideNecessaryLightDom = (keepHeaderVisible = false) => {
  document.querySelectorAll('.js-third-party-auth-toggle-view')?.forEach((node) => {
    const isHeader = node.classList.contains('login-header') || node.classList.contains('signup-header');
    if (isHeader && keepHeaderVisible) {
      return;
    }
    if (!node.classList.contains('hide'))  {
      node.classList.add('hide');
    }
  });
};

/** Shows pertinent light DOM */
const showNecessaryLightDom = () => {
  document.querySelectorAll('.js-third-party-auth-toggle-view')?.forEach((node) => node.classList.remove('hide'));
};

/** Collection of error messages to display if none is given by auth provider */
const errorMsg = {
  generic: 'Something happened when we tried to connect to your preferred login.  You may try again.',
  verificationFail: 'We could not verify your account.  You may try again.',
};

/** Progress messaging that we display while chaining Auth requests */
const progressMsg = {
  genericWait: 'Waiting on provider...',
  googleWait: 'Waiting on Google...',
  locatingAccount: 'Locating your account...',
  loggingIn: 'Logging you in...',
  redirectHome: 'Redirecting you home...',
  redirectBack: 'Redirecting you back...',
  registerAccount: 'Registering your account...',
  connectAccount: 'Connecting your account...',
};

/**
 * IAThirdPartyAuth
 * Main controller for 3rd party auth flows of archive.org
 * User can:
 *  - sign up
 *  - log in
 *  - verify and view user settings
*/
export default class IAThirdPartyAuth extends LitElement {
  static get properties() {
    return {
      googleId: { type: String },
      verifyUser: { type: String},
      csrfToken: { type: String },

      /* private */
      currentOnboardPhase: { type: String },
      isProcessing: { type: Boolean },
      progressMessage: { type: String },
      errorMessage: { type: String },
      archiveAccount: { type: Object },
      thirdPartyProfile: { type: Object },
      tokenToClaim: { type: String },
      rawError: { type: Object }
    };
  }

  constructor() {
    super();
    this.googleId = null;
    this.verifyUser = '';
    this.csrfToken = '';

    this.currentOnboardPhase = 'start';
    this.isProcessing = false;
    this.progressMessage = '';
    this.errorMessage = '';
    this.rawError = {};
    this.tokenToClaim = '';
    this.archiveUser = null;
    this.thirdPartyProfile = null;
    this.iaUserToVerify = '';
  }

  firstUpdated() {
    if (this.verifyUser) {
      // move value to keep immutable
      this.iaUserToVerify = this.verifyUser;
    }
    const loginForm = document.querySelector('.js-submit-login');
    const signupForm = document.querySelector('.js-submit-signup');
    [loginForm, signupForm].forEach((thisForm) => {
      if (thisForm) {
        thisForm.addEventListener('click', (e) => {
          if (e.target.classList.contains('js-submit-login')) {
            this.sendAnalytic(`ia_onboard_login`);
          }
          if (e.target.classList.contains('js-submit-signup')) {
            this.sendAnalytic(`ia_onboard_signup`);
          }
        })
      }
    })
  }
  /**
   * enact side effects that aren't directly tied to the component instance
   * @inheritdoc
   */
  updated(changed) {
    const startedOnboardingFlow = changed.get('currentOnboardPhase') === 'start';
    if (startedOnboardingFlow) {
      hideNecessaryLightDom();
    }

    /* send analytics on changed properties */
    if (changed.has('errorMessage') && this.errorMessage) {
      const { errorCode = 'not_found' } = this.rawError;
      const label = `${this.provider}_error_${errorCode}`;
      this.sendAnalytic(label);
    }

    if (changed.has('currentOnboardPhase') && this.provider) {
      const label = `${this.provider}_onboard_${this.currentOnboardPhase}`;
      this.sendAnalytic(label);
    }
    /* end analytics */
  }

  /** fires analytic */
  sendAnalytic (label = '') {
    log(`** auth analytic:`, label);
    if (window.archive_analytics) {
      window.archive_analytics.send_event_no_sampling(
        'Auth',
        label,
        window.location.pathname,
      );
    }
  }

  /* DOM manipulation */
  resetAuthProps() {
    this.archiveUser = null;
    this.tokenToClaim = null;
    this.isProcessing = false;
    this.progressMessage = '';
    this.currentOnboardPhase = 'start';
  }

  /**
   * Resets user states and shows pertinent light DOM for user to retry auth flow again
   */
  resetFormAndLightDom() {
    this.resetAuthProps();
    showNecessaryLightDom();
  }

  /**
   * Redirects user to referer or home
   */
  redirectUser() {
    this.isProcessing = true;
    const params = new URLSearchParams(window.location.search);
    const refererInUrl = params.get('referer');
    this.progressMessage = refererInUrl ? progressMsg.redirectBack : progressMsg.redirectHome;

    const url = refererInUrl || window.location.origin;
    window.location.href = url;
  }

  /**
   * Moves user through onboarding flow depending on the user's account status
   * Can:
   *  - log user in if IA account is linked to 3rd party account
   *  - move user to registration form if no 3rd party account is associated
   *  - move user to link account form if we have found an IA account that associates with user's 3rd party account
   *
   * @param { userAuthState } - userAuthState (from this.connectUserToArchive)
   */
  moveUserThroughOnboardFlow({ account, linked, third_party_info }) {
    const logUserIn = (phase = 'login') => {
      this.currentOnboardPhase = phase;
      this.progressMessage = progressMsg.loggingIn;
      this.logUserIn();
    };

    if (this.iaUserToVerify) {
      const userIsVerified = actions.verifyAccount.do(this.iaUserToVerify, { account, linked, third_party_info });
      if (!userIsVerified) {
        this.hasAuthError({
          error: errorMsg.verificationFail,
          errorCode: 'ia_cant_verify',
          cannotUseProvider: true
        });
      } else {
        logUserIn('verifiedLogin');
      }
    } else if (linked) {
      logUserIn('linkedLogin'); // essentially logged in
    } else {
      const foundButUnlinked = account && third_party_info && !linked;
      if (foundButUnlinked) {
        this.progressMessage = progressMsg.connectAccount;
        this.currentOnboardPhase = 'link';
      }
      if (!account) {
        this.progressMessage = progressMsg.registerAccount;
        this.currentOnboardPhase = 'register';
      }
    }
  }

  /** IA Requests */
  /**
   * Primary method to connect to IA service
   * @param { Object } action - a choice from SigninService.actions
   * @param { String } extraParams - query params string to add to request URI (ex. `&notifications=foo,bar`)
   *
   * @typedef { Object } userAuthState
   * @property { Object } account - IA Account info
   * @property { Boolean } linked - notes if IA account is linked to third party account
   * @property { Object } third_party_info - Third party user info
   *
   * @returns {(undefined|userAuthState)}
   */
  async connectUserToArchive(action = {}, extraParams = '') {
    this.isProcessing = true;
    const user = await action.do(this.provider, this.tokenToClaim, extraParams) || {};
    const { value: userAuthState, error } = user;

    if (error) {
      this.hasAuthError({
        error: errorMsg.verificationFail,
        errorCode: 'ia_cant_connect_user'
      });
      return false;
    }
    return userAuthState;
  }

  /**
   * Logs user in & moves them along afterwards
   */
  async logUserIn() {
    this.sendAnalytic(`${this.provider}_onboard_loggingIn`);
    await this.connectUserToArchive(actions.logUserIn);

    if (!this.iaUserToVerify) {
      this.redirectUser();
    }
  }

  /** Links found IA account to user's third party profile */
  async linkAccount() {
    const user = await this.connectUserToArchive(actions.linkUserToAccount);
    if (user) {
      this.progressMessage = progressMsg.loggingIn;
      this.logUserIn(user);
    } else {
      this.isProcessing = false;
    }
  }

  /**
   * Registers user
   * @param { Object } event - Event
   */
  async registerUser(event) {
    event.preventDefault(); // don't let that form submit
    const notifications = [];
    event.target.querySelectorAll('input').forEach((input) => {
      if (input.checked) {
        notifications.push(input.value);
      }
    });
    const userAnnouncements = `&notifications=${notifications.filter((pref) => !!pref).join(',')}`;
    const user = await this.connectUserToArchive(actions.registerUser, userAnnouncements);
    if (!user) {
      this.resetFormAndLightDom();
      return;
    }
    this.currentOnBoardPhase
    this.logUserIn();
  }

  /* event handlers */
  /**
   * Starts connecting user to archive once third party profile is received
   * - sets pertinent states
   * @param { Object } event - Custom Event
   */
  async startConnectingUserToIA(event) {
    this.errorMessage = '';
    const { detail = {}} = event;
    const { tokenToClaim, thirdPartyProfile } = detail;
    this.thirdPartyProfile = thirdPartyProfile;
    this.tokenToClaim = tokenToClaim;
    this.progressMessage = progressMsg.locatingAccount;

    const user = await this.connectUserToArchive(actions.checkIfAccountExists);
    if (!user) { return; }

    const { account } = user;
    const userProfile = new AuthUserProfile();
    userProfile.email = account?.username || '';
    userProfile.screenname = account?.screenname || '';
    this.archiveAccount = userProfile;
    this.isProcessing = false;
    this.moveUserThroughOnboardFlow(user);
  }

  /**
   * Main error handler
   * - displays messages when an error occurs
   * - resets pertinent state
   * @param { Object } detail - Custom Event
   */
  hasAuthError(errorDetails) {
    log('auth hasAuthError', errorDetails);
    const { error: errorMessage = '', cannotUseProvider = false } = errorDetails;
    this.isProcessing = false;
    this.errorMessage = errorMessage || errorMsg.generic;
    this.rawError = { ...errorDetails };
    if (cannotUseProvider) {
      this.resetFormAndLightDom();
    }
  }

  /**
   * Starts user on onboarding flow
   * - sets pertinent properties
   * @param { String } providerName - (ex. google) (lowercase)
   */
  startAuthFlow(providerName) {
    this.provider = providerName;
    this.progressMessage = progressMsg[`${providerName}Wait`] || progressMsg.genericWait;
    this.isProcessing = true;
    this.errorMessage = '';
  }
  /* end event handlers */

  /** render */
  get registerNewUserPrompt() {
    const { email } = this.thirdPartyProfile;
    return promptWelcomeNewUser(
      { email },
      (event) => {
        this.sendAnalytic(`${this.provider}_onboard_registering`);
        this.registerUser(event);
      },
      this.isProcessing,
      this.progressMessage
    );
  }

  get linkAccountPrompt() {
    const { email, screenname } = this.archiveAccount;
    return PromptLinkAccount(
      { email, screenname },
      (e) => {
        this.sendAnalytic(`${this.provider}_onboard_linking`);
        this.linkAccount(e);
      },
      () => {
        this.sendAnalytic(`${this.provider}_onboard_cancelLink`);
        this.resetFormAndLightDom();
      },
      this.isProcessing,
      this.progressMessage
    );
  }

  get googleAuthButton() {
    return html`
      <ia-google-auth
        .clientId=${this.googleId}
        .progressMessage=${this.progressMessage}
        ?isProcessing=${this.isProcessing}
        @click=${() => this.startAuthFlow('google')}
        @hasAuthError=${e => this.hasAuthError(e.detail)}
        @profileReceived=${e => this.startConnectingUserToIA(e)}
      ></ia-google-auth>
    `;
  }

  get renderCoreAccountSettings() {
    return html`
      <a class="cancel link-button error" role="button" @click=${() => this.resetFormAndLightDom()}>Cancel</a>
      <ia-core-user-settings
        .csrfToken=${this.csrfToken}
        .userProfile=${this.archiveAccount}
      ></ia-core-user-settings>
    `;
  }

  render() {
    const showAccountSettings = this.currentOnboardPhase === 'verifiedLogin';
    if (showAccountSettings) {
      return this.renderCoreAccountSettings;
    }

    const errorStyle = this.errorMessage && this.rawError?.softMessage ?   '' : 'error';
    const buttonSectionClass = this.currentOnboardPhase === 'start' ? '' : 'hide';
    return html`
      ${this.currentOnboardPhase === 'register' ? this.registerNewUserPrompt : nothing}
      ${this.currentOnboardPhase === 'link' ? this.linkAccountPrompt : nothing}
      <section class="${buttonSectionClass}">
        ${this.googleId ? this.googleAuthButton : nothing}
        ${this.errorMessage ? html`<p class=${errorStyle}>${unsafeHTML(this.errorMessage)}</p>` : nothing}
      </section>
    `;
  }

  static get styles() {
    const customStyles = css`
      :host {
        display: block;
        width: 100%;
      }

      :host(:focus) {
        outline: none;
      }

      section {
        width: 100%;
      }

      .hide {
        display: none;
      }

      h2 {
        margin: 0 0 .6rem;
        font-size: 2.4rem;
        color: #333;
      }

      p {
        font-size: 1.4rem;
        margin-bottom: 2rem;
      }

      .error {
        color: #e51c26;
      }

      .header {
        text-align: center;
      }

      img.logo {
        height: 8rem;
        margin: 3rem 0;
        vertical-align: middle;
      }

      .prompt h4 {
        margin-bottom: 0;
      }
      .prompt p {
        margin-top: 0;
      }

      form .cta {
        display: block;
      }

      .cta {
        display: inline-flex;
        align-items: center;
        margin-top: 2rem;
      }

      .cta .loading-indicator,
      .cta .progress-msg,
      .cta button:nth-child(2) {
        margin-left: 1rem;
      }
    `;

    return [
      customStyles,
      baseButtonStyles,
    ];
  }
}

customElements.define('ia-third-party-auth', IAThirdPartyAuth);
