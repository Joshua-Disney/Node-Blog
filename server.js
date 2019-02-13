const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('./users/usersRouter.js');
const postsRouter = require('./posts/postsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('<h1>Code me, Disney</h1>');
});

module.exports = server;