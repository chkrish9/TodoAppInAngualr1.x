var moogoose = require('mongoose');
var express = require('express');
var Todo = require('../db/db').Todo;
var router = express.Router();
moogoose.Promise = require('bluebird');

router.get('/',function(req,res){
    Todo.find().then(
        function(respond){
            res.send({ todos: respond });
        },
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
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

router.put('/:id',function(req,res){
    var id=req.params.id;
    Todo.update({ _id : moogoose.Types.ObjectId(id) }, { $set : { task : req.body.task } }).then(
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

router.delete('/:id',function(req,res){
    var id=req.params.id;
    Todo.remove({ _id : moogoose.Types.ObjectId(id) }).then(
        function(respond){
            res.send("Deleted successfully");
        },
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
});
module.exports = router;
