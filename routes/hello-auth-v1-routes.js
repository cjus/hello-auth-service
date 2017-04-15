/**
 * @name hello-auth-v1-api
 * @description This module packages the Hello-auth API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/', (req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});

api.get('/secure', hydraExpress.validateJwtToken(), (req, res) => {
  console.log(req.authToken);
  res.sendOk({greeting: 'Now we can share some secrets!'});
});

module.exports = api;
