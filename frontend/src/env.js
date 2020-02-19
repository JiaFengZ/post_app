
export const environment = {
  apiServerUrl: '', // http://127.0.0.1:5000
  auth0: {
    url: 'dev-fsnd', // the auth0 domain prefix
    audience: 'post_app_auth', // the audience set for the auth0 app
    clientId: 'RwW3UXqrkTKTaU1VyGkrVaUwwUkDAvdo', // the client id generated for the auth0 app
    callbackURL: 'https://post-app-zjf.herokuapp.com/web', // the base url of the running application. 
  }
};
