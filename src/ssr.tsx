import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'

import * as Sentry from '@sentry/tanstackstart-react'
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
})

let streamHandler = defaultStreamHandler

streamHandler = Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler)

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(streamHandler)
