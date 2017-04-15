# hello-auth-service

This is a [Hydra-express service](https://www.npmjs.com/package/hydra-express) which demonstrates the use of an auth endpoint. Intended for use with the [auth-svcs](https://github.com/cjus/auth-svcs) and optionally, the [Hydra-Router](https://github.com/flywheelsports/hydra-router).

## Installation

```javascript
$ cd hello-auth-service
$ npm install
```

## Trial

```shell
$ npm start
```

## Updating the public service certificate

This repo ships with a `config/service.pub` public certificate. However, you must replace that cert with the one that was created using the `./scripts/keygen.sh` script in the  [auth-svcs](https://github.com/cjus/auth-svcs)  project. This ensures that this service can validate JSON Web Tokens created by the auth-svcs.

## Securing API routes

Hydra-Express makes it easy create secure API routes using the built-in `hydraExpress.validateJwtToken()` middleware. To use it you just need to add it to your routes:

```javascript
api.get('/secure', hydraExpress.validateJwtToken(), (req, res) => {
  res.sendOk({greeting: 'Now we can share some secrets!'});
});
```

## Docker 

This repo can be built and deployed using Docker. The first parameter below is your dockerhub username and the second is the container name and versions.

```
$ ./dockerbuild.sh cjus hello-auth-service:0.0.1
```

Using the service in a docker container does introduce considerations regarding how the config.json file is managed. See: https://www.hydramicroservice.com/docs/docker/using-hydra-with-docker.html