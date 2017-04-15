# hello-auth-service

This is a [Hydra-express service](https://www.npmjs.com/package/hydra-express) which demonstrates the use of an auth endpoint. Intended for use with the [auth-svcs](https://github.com/cjus/auth-svcs) and optionally, the [Hydra-Router](https://github.com/flywheelsports/hydra-router).

The auth-svcs and this hello-auth-service work with [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) - an industry standard for representing claims between multiple parties (such as microservices).

## Installation and startup

```javascript
$ cd hello-auth-service
$ npm install
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

If you set a breakpoint on the res.sendOk line above and inspect `req.authToken` or add a `console.log(req.authToken)` you'll see the contents of the decoded authToken. The token was validated using the public certificate and parsed using the hydraExpress validateJwtToken() middleware.

```javascript
{ 
  uid: 'b1593f81-3645-4437-a656-3ec333a6cfcc',
  roles: [ 'admin', 'developer' ],
  userName: 'cjus',
  firstName: 'Carlos',
  lastName: 'Justiniano',
  issuer: 'urn:auth',
  exp: 1492285568,
  iat: 1492281968 
}
```

This allows you to write code which inspects a user's role/permissions, their userName and even determine when the token was issued (iat) and when the token is set to expire (exp).

## Docker 

This repo can be built and deployed using Docker. The first parameter below is your dockerhub username and the second is the container name and versions.

```
$ ./dockerbuild.sh cjus hello-auth-service:0.0.1
```

Using the service in a Docker container does introduce considerations regarding how the config.json file is managed. See: https://www.hydramicroservice.com/docs/docker/using-hydra-with-docker.html