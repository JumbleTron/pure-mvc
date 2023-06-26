import './auth.js';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MemoryStore from 'express-session/session/memory.js';
import http from 'http';
import passport from 'passport';

import { createUserTable, db } from './database.js';
import useRouter from './router.js';
import sequelize from './sequelize.js';

const port = process.env.port || 3000;

const sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  store: new MemoryStore(),
  saveUninitialized: false,
  cookie: { secure: false },
};

const server = http.createServer((req, res) => {
  res.redirect = (url) => {
    res.writeHead(302, {
      location: url,
    });
    res.end();
  };
  bodyParser.urlencoded({ extended: false })(req, res, () => {
    cookieParser()(req, res, () => {
      session(sessionOptions)(req, res, () => {
        passport.authenticate('session')(req, res, () => {
          useRouter(req, res);
        });
      });
    });
  });
});

server.on('close', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

async function init() {
  try {
    createUserTable(db);
    await sequelize.authenticate();
    console.log('Database connection OK!');
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

init();
