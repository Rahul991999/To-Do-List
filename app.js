// 'use strict'
// const express = require('express');
// const bodyparser = require('body-parser');
// const app = express();
// app.set('view engine', 'ejs');
// app.get('/', function (req, res) {
//     const date = new Date();
//     const currentDay = date.getDay();   // 0-6 sunday - saturday
//     switch (currentDay) {
//         case (0):
//             res.render("list", { currentDay: "Sunday" });
//             break;
//         case (1):
//             res.render("list", { currentDay: "Monday" });
//             break;
//         case (2): s
//             res.render("list", { currentDay: "Tuesday" });
//             break;
//         case (3):
//             res.render("list", { currentDay: "Wednesday" });
//             break;
//         case (4):
//             res.render("list", { currentDay: "Thursday" });
//             break;
//         case (5):
//             res.render("list", { currentDay: "Friday" });
//             break;
//         case (6):
//             res.render("list", { currentDay: "Saturday" });
//             break;
//         default:
//             res.render("list", { currentDay: "ERROR OCCURED" });
//     }
// })

// app.listen(3000, function () {
//     console.log('OUR SERVER IS LIVE');
// })



// FOR SECOND TEMPLATE FILE


// 'use strict'
// const express = require('express');
// const bodyparser = require('body-parser');
// const app = express();
// app.set('view engine', 'ejs');
// app.get('/', function (req, res) {1
//     const date = new Date();
//     const currentDay = date.getDay();   // 0-6 sunday - saturday
//     switch (currentDay) {
//         case (0):
//             res.render("list1", { currentDay: "Sunday" });
//             break;
//         case (1):
//             res.render("list1", { currentDay: "Monday" });
//             break;
//         case (2): s
//             res.render("list1", { currentDay: "Tuesday" });
//             break;
//         case (3):
//             res.render("list1", { currentDay: "Wednesday" });
//             break;
//         case (4):
//             res.render("list1", { currentDay: "Thursday" });
//             break;
//         case (5):
//             res.render("list1", { currentDay: "Friday" });
//             break;
//         case (6):
//             res.render("list1", { currentDay: "Saturday" });
//             break;
//         default:
//             res.render("list1", { currentDay: "ERROR OCCURED" });
//     }
// })

// app.listen(3000, function () {
//     console.log('OUR SERVER IS LIVE');
// })


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

const wakeUp = new Todolist({
    name: 'Wakeup'
})

const gym = new Todolist({
    name: 'GYM'
})

const library = new Todolist({
    name: 'Library'
})

const defaultArr = [wakeUp, gym, library];

app.get('/', function (req, res) {
    Todolist.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            if (items.length === 0) {
                Todolist.insertMany(defaultArr, function (error) {
                    if (err) {
                        console.log(error);
                    }
                    else {
                        console.log('Items added successfully');
                        res.redirect('/');
                    }
                });
            } else {
                console.log(items);
                res.render("listmain", { title: date.getDate(), targets: items });
            }
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

app.listen(3000, function () {
    console.log('OUR SERVER IS LIVE');
})
