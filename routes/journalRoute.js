const router = require('express').Router();
const _response = require('../models/response');
const Journal = require("../models/journal");
const async = require("async");

router.get('/:id', (req, res) => {

    let queryArgs = [];

    if(req.params.id !== undefined){
        queryArgs.push[req.param.id];
    }

    async.waterfall([
        function queryDatabase(callback){
            req.getConnection( function(err, conn){
                if(err) callback(_response.err, null);
        
                conn.query("SELECT * FROM journal WHERE id = ?", queryArgs, function(err, rows){
                    if(err) callback(err, null); 
                    else{
                        if(rows.length < 1){
                            callback(null, _response.success_journal_not_found);
                        }
                        else{
                            let response =  _response.success;
                            response.message = rows; 
                            callback(null, response);
                        }
                    }
                });
            })
        }
    ],  function handleErrors(err, result){
        if(err) res.status(400).json(err);
        else res.status(200).json(result);
    });
});

// GET all journals
router.get('/', (req, res) => {

    let queryString = "";
    let queryArgs = [];

    async.waterfall([
        function queryDatabase(callback){
            req.getConnection( function(err, conn){
                if(err) callback(_response.err, null);
        
                conn.query("SELECT * FROM journal " + queryString, queryArgs, function(err, rows){
                    if(err) callback(err, null); 
                    else{
                        if(rows.length < 1){
                            callback(null, _response.success_journal_not_found);
                        }
                        else{
                            let response =  _response.success;
                            response.message = rows; 
                            callback(null, response);
                        }
                    }
                });
            })
        }
    ],  function handleErrors(err, result){
        if(err) res.status(400).json(err);
        else res.status(200).json(result);
    });
});

router.post('/', (req, res) => {
    let journalArray = [];
    let journalSingle;
    let isMultiInput = false;
    let queryString;
    let queryArgs = [];
    
    if(req.body.data === undefined){
        res.status(400).json(_response.error_bad_request);
        return
    }

    if(Array.isArray(req.body.data)){
        isMultiInput = true;
        req.body.data.forEach(function(journal){
            journalSingle = new Journal(journal);
            journalArray.push(journalSingle);
        })
    } 
    else{
        journalSingle = new Journal(req.body.data);
    }

    if(isMultiInput){
        journalArray.forEach((element, index) => {
            if(element.content && element.date && element.title){
                queryString += "( ?, ?, ? )";
                queryArgs.push(element.content);
                queryArgs.push(element.date);
                queryArgs.push(element.title);
            }

            if(index !== journalArray.length){
                queryString += ", ";
            }
        });
    }
    else{
        queryString += "( ?, ?, ? )";
        queryArgs.push(journalSingle.content);
        queryArgs.push(journalSingle.date);
        queryArgs.push(journalSingle.title);
    }

    async.waterfall([
        function queryDatabase(callback){
            req.getConnection( function(err, conn){
                if(err) callback(_response.err, null);
        
                conn.query("INSERT INTO journal(content, date, title) VALUES" + queryString, queryArgs, function(err, rows){
                    if(err) callback(err, null); 
                    else{
                        if(rows.length < 1){
                            callback(null, _response.success_journal_not_found);
                        }
                        else{
                            let response =  _response.success;
                            response.message = rows; 
                            callback(null, response);
                        }
                    }
                });
            })
        }
    ],  function handleErrors(err, result){
        if(err) res.status(400).json(err);
        else res.status(200).json(result);
    });
});

router.put('/:id', (req, res) => {
    let queryArgs = [];

    if(req.params.id === undfined){
        res.status(400).json(_response.error_bad_request);
        req.body.data.id = req.params.id;
        return
    }
    
    let journalSingle = new Journal(req.body.data);

    queryArgs.push(journalSingle.content)
        .push(journalSingle.date)
        .push(journalSingle.title)
        .push(journalSingle.id);
    
    async.waterfall([
        function queryDatabase(callback){
            req.getConnection( function(err, conn){
                if(err) callback(_response.err, null);
        
                conn.query("UPDATE journal set content = ? , date = ?, title = ? WHERE id = ?", queryArgs, function(err, rows){
                    if(err) callback(err, null); 
                    else{
                        if(rows.length < 1){
                            callback(null, _response.success_journal_not_found);
                        }
                        else{
                            let response =  _response.success;
                            response.message = rows; 
                            callback(null, response);
                        }
                    }
                });
            })
        }
    ],  function handleErrors(err, result){
        if(err) res.status(400).json(err);
        else res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    let id = req.params.id;
    let queryArgs = [];
    queryArgs.push(id);

    async.waterfall([
        function queryDatabase(callback){
            req.getConnection( function(err, conn){
                if(err) callback(_response.err, null);
        
                conn.query("DELETE FROM journal WHERE id = ?", queryArgs, function(err, rows){
                    if(err) callback(err, null); 
                    else{
                        if(rows.length < 1){
                            callback(null, _response.success_journal_not_found);
                        }
                        else{
                            let response =  _response.success;
                            response.message = rows; 
                            callback(null, response);
                        }
                    }
                });
            })
        }
    ],  function handleErrors(err, result){
        if(err) res.status(400).json(err);
        else res.status(200).json(result);
    });
})


module.exports = router;