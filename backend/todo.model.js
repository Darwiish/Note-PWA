const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let date = new Date().toLocaleString();

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    },
    startDate:{
        type: String,
        format: Date
    },
    endDate:{
        type: String,
        format: Date
    }
   
});

module.exports = mongoose.model('Todo', Todo);