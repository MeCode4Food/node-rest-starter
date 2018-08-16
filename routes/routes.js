const routes = require('express').Router();
const apiRoutes = require('express').Router();
const journal = require('./journalRoute');


routes.use('/api', apiRoutes);
apiRoutes.use('/', (req, res)=>{
    res.status(200).json({ status: "OK"});
})

apiRoutes.use('/journal', journal);

module.exports = routes;