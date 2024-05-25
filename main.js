// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');
///////////////////////////////////////////////////////////////////

const app = express();
const PORT = process.env.PORT || 4000;

// database connection
const url = process.env.DB_URL;
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('db connected'))
	.catch((err) => console.log(`this is the error: ${err}`));
///////////////////////////////////////////////////////////////////

// middlewares
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use(
	session({
		secret: 'my secret key',
		saveUninitialized: true,
		resave: false,
	})
);

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
});
app.use(express.static('views'));
app.use(express.static('uploads'));
app.use(cookieParser());

///////////////////////////////////////////////////////////////////

// set template engine
app.set('view engine', 'ejs');
///////////////////////////////////////////////////////////////////

// route prefix
app.use('', routes);
///////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
	console.log(`Server started at: http://localhost:${PORT}`);
});
