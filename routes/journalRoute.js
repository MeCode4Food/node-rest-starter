const router = require('express').Router();
const _response = require('../models/response');
const Journal = require("../models/journal");
const async = require("async");

router.get('/', (req, res) => {

    let queryString = "";
    let queryArgs = [];

    if(req.params.id !== undefined){
        queryString += "WHERE ";
        queryString += "id = ?";
        queryArgs.push[req.param.id];
    }

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

router.put('/', (req, res) => {
    let journalArray;
    let journal
    if(req.body.data !== undefined){
        journalArray = req.body.data;
    }
    else{
        res.status(400).json(_response.error_bad_request);
        return
    }

    let queryString = "";
    let queryArgs = [];

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

// todo : DELETE

module.exports = router;