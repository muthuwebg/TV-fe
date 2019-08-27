require('dotenv').config();

const createError = require('http-errors'),
	env = process.env.NODE_ENV,
	express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	session = require("express-session"),
	RedisStore = require("connect-redis")(session),
	redis = require('redis'),
	logger = require('morgan');

const indexRouter = require('./routes/index'),
	middleware = require('./middlewares'),
	ajax = require('./routes/ajax-router'),
	utils = require("./utils/index"),
	usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(cookieParser(process.env.SESSION_SECRET));

var sess = {
    name: "INFLUX",
    store: new RedisStore({
        client: redis.createClient({
					host: process.env.REDIS_HOST,
					port: process.env.REDIS_PORT,
					db: process.env.REDIS_DB
				}),
        db: parseInt(process.env.REDIS_DB),
        ttl: 3600 // 1 hour in seconds
    }),
    cookie: {
        domain: process.env.SESSION_DOMAIN,
        maxAge: 3600000, // 1 hour in milliseconds
        httpOnly: true
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));

// utils
app.use((req, res, next) => {
    res.locals.utils = utils;
    if (req.session.userInfo === undefined)
    	req.session.userInfo = {};

    if (req.session.userInfo && (req.session.userInfo.isLoggedIn == undefined || req.session.userInfo.isLoggedIn == false)) {
    	req.session.userInfo.isLoggedIn = false;
    	req.session.userInfo.name = "User";
    }
    res.locals.userInfo = req.session.userInfo;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ajax', middleware.verifyAjaxRequest, ajax);
app.use('/logout', (req, res, next) => {
	req.session.destroy();
	res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
