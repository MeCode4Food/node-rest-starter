const routes = require('express').Router();
const apiRoutes = require('express').Router();
const journal = require('./journalRoute');

routes.use('/api', apiRoutes);

apiRoutes.use('/journal', journal);

module.exports = routes;