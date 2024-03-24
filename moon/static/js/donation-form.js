/* eslint-disable no-undef */
import '../web_modules/@internetarchive/donation-form.js';
import '../web_modules/@internetarchive/modal-manager.js';
import BraintreeEndpointManager from './braintree-endpoint-manager.js';
import AnalyticsHandler from '../analyticsHandler/analyticsHandler.js';

/**
 * This is an analytics handler for the donation form.
 *
 * Internally, the donationform is using send_event, which is sampled by default,
 * but we want it unsampled so this just proxies it to `send_event_no_sampling()`
 *
 * @class DonationFormAnalyticsHandler
 */
class DonationFormAnalyticsHandler {
  constructor() {
    this.analyticsBackend = new AnalyticsHandler();
  }

  send_event(
      category, action, label, additionalEventParams,
  ) {
    this.analyticsBackend.send_event_no_sampling(
      category, action, label, additionalEventParams,
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const endpointManager = new BraintreeEndpointManager();
  const formController = document.querySelector('donation-form-controller');
  const recaptchaElement = document.querySelector('#recaptcha');
  const modalManager = document.querySelector('modal-manager');
  const analyticsHandler = new DonationFormAnalyticsHandler();

  formController.endpointManager = endpointManager;
  formController.modalManager = modalManager;
  formController.recaptchaElement = recaptchaElement;
  formController.analyticsHandler = analyticsHandler;

  analyticsHandler.send_event('DonatePage', 'pageViewed');
});
