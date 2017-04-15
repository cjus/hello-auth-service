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

## Docker 

This repo can be built and deployed using Docker. The first parameter below is your dockerhub username and the second is the container name and versions.

```
$ ./dockerbuild.sh cjus hello-auth-service:0.0.1
```

Using the service in a docker container does introduce considerations regarding how the config.json file is managed. See: https://www.hydramicroservice.com/docs/docker/using-hydra-with-docker.html