const express = require('express');
const server = express();

const ProjectsRouter = require('./ProjectsRouter.js');

server.use(express.json());
server.use('/api/projects', ProjectsRouter)

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my DB Sprint</h1>')
})

module.exports = server;