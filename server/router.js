const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/welcome', mid.requiresLogin, controllers.Welcome.welcomePage);
  //app.get('/horrorScope', mid.reqiresLogin, controllers.)
  //app.get('/compendium', mid.requiresLogin, controllers.)
  //app.get('/profile', mid.requiresLogin, controlers.Account.profilePage)
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
