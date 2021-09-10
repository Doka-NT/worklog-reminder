import { Integrations } from '@sentry/tracing';
import AbstractMonitoringAgent from './AbstractMonitoringAgent';

export default class SentryAgent extends AbstractMonitoringAgent {
  startMainAgent() {
    super.startMainAgent();

    this.initSentry(require('@sentry/browser'));
  }

  startRendererAgent() {
    super.startRendererAgent();

    this.initSentry(require('@sentry/react'));
  }

  initSentry(Sentry) {
    Sentry.init({
      dsn: 'https://4a52bc1ea14940deaa8171cf4a5a4b66@o994775.ingest.sentry.io/5953421',
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
}
