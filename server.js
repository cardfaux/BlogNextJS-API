const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chalk = require('chalk');
const mongoose = require('mongoose');

require('dotenv').config();

// BRING IN ROUTES
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

// APP
const app = express();


// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(chalk.bgMagentaBright.cyanBright('DATABASE CONNECTED')));

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// ROUTES MIDDLEWARES
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// PORT
const port = process.env.PORT || 8000;

// START SERVER
app.listen(port, () => {
  console.log(chalk.bgCyanBright.magentaBright(`Server Is Running On Port ${ port }`));
})
