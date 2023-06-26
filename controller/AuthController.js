import passport from 'passport';

import { UserModel } from '../model/UserModel.js';
import { AbstractController } from './AbstractController.js';

export default class AuthController extends AbstractController {
  async indexAction() {
    const userModel = new UserModel();
    this.renderView('auth/index.ejs', {});
  }

  async createAction() {
    const res = this.res;
    const req = this.req;
    passport.authenticate('local', {
      successReturnToOrRedirect: '/protected/users',
      failureRedirect: '/auth',
      failureMessage: true,
    })(req, res);
  }

  logoutAction() {
    const res = this.res;
    const req = this.req;

    req.session.destroy();
    res.redirect('/');
  }
}
