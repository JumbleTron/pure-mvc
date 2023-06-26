import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import { UserModel } from './model/UserModel.js';

passport.use(
  'local',
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const userModel = new UserModel();
      const user = await userModel.getByEmail(username);

      if (!user) {
        return cb(null, false, {
          message: 'Nieprawidłowy adres e-mail lub hasło',
        });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return cb(null, false, {
          message: 'Nieprawidłowy adres e-mail lub hasło',
        });
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
