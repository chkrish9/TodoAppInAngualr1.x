var moogoose = require('mongoose');
var express = require('express');
var Todo = require('../db/db').Todo;
var router = express.Router();
moogoose.Promise = require('bluebird');

router.get('/',function(req,res){
    res.send("HELLO FROM SERVER TODOS");
});

router.post('/',function(req, res){
    var todo = new Todo(req.body);
    todo.save().then(
    function(respond){
       res.send(respond._doc);
    },
    function(err){
        if(err){
            console.log(err);
        }
    }
    );
});
module.exports = router;
