
'use strict'
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const date = require(__dirname + "/date.js");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todolistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Todolist = new mongoose.model('Todolist', todolistSchema);

app.get('/', function (req, res) {
    Todolist.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render("listmain", { title: date.getDate(), targets: items });
        }
    })

})

app.post("/", function (req, res) {
    (new Todolist(
        {
            name: req.body.todo
        }
    )).save();
    console.log(req.body)
    res.redirect('/');
})

app.post('/delete', function (req, res) {
    Todolist.deleteOne({ _id: req.body.checkbox }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted successfully");
            res.redirect('/');
        }
    })
})

app.listen(3000, function () {
    console.log('OUR SERVER IS LIVE');
})
