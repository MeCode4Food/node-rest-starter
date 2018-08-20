const router = require('express').Router();
const apiRouter = require('express').Router();
const journal = require('./journalRoute');

router.get('/info', function(req, res){
    res.status(200).json({ status:"OK", message: "chick's express API"});
});

router.use('/api', apiRouter);

apiRouter.use('/journal', journal);
apiRouter.use('/user', user);

module.exports = router;