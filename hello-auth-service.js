/**
* @name Hello-auth
* @summary Hello-auth Hydra Express service entry point
* @description Demonstrates auth endpoints
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');

const jwtAuth = require('fwsp-jwt-auth');
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return jwtAuth.loadCerts(null, config.jwtPublicCert);
  })
  .then(status => {
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1/hello-auth': require('./routes/hello-auth-v1-routes')
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
