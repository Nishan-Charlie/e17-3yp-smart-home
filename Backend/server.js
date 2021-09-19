const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongodbConnect = require('./config/dbs');
const passport = require('passport');
// const bodyParser = require('body-parser');
const router = require('./routes/getData');
//connect to database
mongodbConnect();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(passport.initialize());
require('./config/passport')(passport);

/*
Concise output colored by response status for development use. 
The :status token will be colored 
green for success codes,
red for server error codes, 
yellow for client error codes, 
cyan for redirection codes, 
and uncolored for information codes.
*/
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//Port Declaring
const PORT = process.env.PORT || 5005;
app.listen(
	PORT,
	console.log(
		` Servever Listening to ${process.env.NODE_ENV} mode on port ${PORT} `
	)
);
