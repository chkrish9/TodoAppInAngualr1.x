var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todos');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    task: String,
    isCompleted: Boolean,
    isEditing: Boolean
});

var Todo = mongoose.model('Todo',todoSchema);

// var AnotherSchema = mongoose.model('AnotherSchema',{
//     task: String,
//     isCompleted: Boolean,
//     isEditing: Boolean
// });

module.exports.Todo = Todo;
//module.exports.AnotherSchema = AnotherSchema;