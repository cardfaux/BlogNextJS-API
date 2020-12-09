const express = require('express');
const helmet = require("helmet");
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
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');

// APP
const app = express();


// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(chalk.bgMagentaBright.cyanBright('DATABASE CONNECTED'))
  });

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// ROUTES MIDDLEWARES
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', formRoutes);

// PORT
const PORT = process.env.PORT || 8000;

// START SERVER
app.listen(PORT, () => {
  console.log(chalk.bgCyanBright.magentaBright(`Server Is Running On Port ${ PORT }`));
  console.log(chalk.bgYellowBright(`Your API can be found at ${process.env.API_URL}:${ PORT }/api`));
  console.log(chalk.bgGreen(`Your Client Application Can Be Found At ${process.env.CLIENT_URL}`));
});
