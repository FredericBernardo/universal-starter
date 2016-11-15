/**
 * Module dependencies.
 */
import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';

var ROOT = '../../../../';

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (patterns: any, excludeDirs?: any): string[] {
  let globPatterns: string[] = _.isArray(patterns) ? patterns : [ patterns ];
  let excludes: string[] = _.isArray(excludeDirs) ? excludeDirs : [ excludeDirs ];

  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output: string[];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  globPatterns.forEach(globPattern => {
    if (urlRegex.test(globPattern)) {
      output.push(globPattern);
    } else {
      var files = glob.sync(globPattern);
      if (excludes) {
        files = files.map(function (file) {
          for (var i in excludes) {
            if (excludes.hasOwnProperty(i)) {
              file = file.replace(excludes[i], '');
            }
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  });

  return output;
};

/**
 * Validate NODE_ENV existence
 */
var validateEnvironmentVariable = function () {
  var environmentFiles = glob.sync('./config/env/' + (process.env.NODE_ENV || 'development') + '.js');
  console.log();
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white(''));
};

/**
 Validate config.domain is set
 */
var validateDomainIsSet = function (config) {
  if (!config.domain) {
    console.log(chalk.red('+ Important warning: config.domain is empty. It should be set to the fully qualified domain of the app.'));
  }
};

/**
 * Validate Secure=true parameter can actually be turned on
 * because it requires certs and key files to be available
 */
var validateSecureMode = function (config) {

  if (!config.secure || config.secure.ssl !== true) {
    return true;
  }

  var privateKey = fs.existsSync(path.resolve(config.secure.privateKey));
  var certificate = fs.existsSync(path.resolve(config.secure.certificate));

  if (!privateKey || !certificate) {
    console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
    console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
    console.log();
    config.secure.ssl = false;
  }
};

/**
 * Validate Session Secret parameter is not set to default in production
 */
var validateSessionSecret = function (config) {

  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (config.sessionSecret === 'MEAN') {
    console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
    console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
    console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
    console.log();
  }
  return false;
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFolders = function (config, assets) {
  // Appending files
  config.folders = {
    server: {},
    client: {}
  };

  // Setting globbed client paths
  config.folders.client = getGlobbedPaths([path.join(ROOT, 'modules/*/client/'), ROOT.replace(new RegExp(/\\/g), '/')]);
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    server: {},
    client: {}
  };

  // Setting Globbed models files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Setting Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);

  // Setting Globbed socket files
  config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

  // Setting Globbed policies files
  config.files.server.policies = getGlobbedPaths(assets.server.policies);

  // Setting Globbed client files
  config.files.client.modules = getGlobbedPaths(assets.client.modules, 'public/');

  // Setting Globbed css files
  config.files.client.css = getGlobbedPaths(assets.client.css, 'public/');
};

/**
 * Initialize global configuration
 */
var initGlobalConfig = function() {

  // Validate NODE_ENV existence
  validateEnvironmentVariable();

  var env = process.env.NODE_ENV;

  // Get the default assets
  var defaultAssets = require('../assets/default');

  // Get the current assets
  var environmentAssets = require('../assets/' + env) || {};

  // Merge assets
  var assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  var defaultConfig = require('../env/default');

  // Get the current config
  var environmentConfig = require('../env/' + env) || {};

  // Merge config files
  var config = _.merge(defaultConfig, environmentConfig);

  // read package.json for project information
  var pkg = require('../../../../package.json');
  config.meanjs = pkg;

  // Extend the config object with the local-NODE_ENV.js custom/local environment. This will override any settings present in the local configuration.
  config = _.merge(config, (fs.existsSync('../env/local-' + env + '.js') && require('../env/local-' + env + '.js')) || {});

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  // Validate Secure SSL mode can be used
  validateSecureMode(config);

  // Validate session secret
  validateSessionSecret(config);

  // Print a warning if config.domain is not set
  validateDomainIsSet(config);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths: getGlobbedPaths,
    validateSessionSecret: validateSessionSecret
  };

  return config;
};

export const config = initGlobalConfig();
