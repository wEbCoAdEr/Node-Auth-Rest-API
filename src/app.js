// Import dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const config = require('./config');
const initializeSentry = require('./utils/sentry.util');
const { errorHandler } = require('./middlewares');
const router = require('./routes/v1');

// Initiate express app
const app = express();

// Initialize Sentry with express app instance
const sentry = initializeSentry(app);

// The request handler middleware of sentry
app.use(sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(sentry.Handlers.tracingHandler());

// Set HTTP security headers
app.use(helmet());

// Apply Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Compress response bodies for all requests
app.use(compression());

// Define routers
app.use(config.API_ENPOINT_PREFIX, router);

// Sentry error handler
app.use(sentry.Handlers.errorHandler());

// Register the error handling middleware
app.use(errorHandler);

module.exports = app;