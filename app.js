
const express = require('express');
const session = require('express-session');
const db = require('mysql');
require("dotenv").config();
const server = require('./chat/chat')
const bodyParser = require('body-parser');
const path = require('path');
const port = 8080;


const app = express();

app.use('/resources', express.static(path.join(__dirname, 'resources')))


app.set('views',path.join(__dirname,'public/views'));
app.set('view engine', 'ejs');

connection = db.createConnection({

    database:'user_login',
    user:'',
    password: '',
    host: '127.0.0.1',
    port: 3306

});

connection.connect(function(error){
    if(!!error)console.log(error);
    else console.log('Database is connected !')
});



app.use(express.static('public'));


// Login
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',  (req,res)=> {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/activity',(req,res)=>{
    if(req.session.loggedin){
        res.sendFile(path.join(__dirname + '/public/activity.html'));
    }
    //res.end();
});

app.get('/signup',  (req,res)=> {
    res.sendFile(path.join(__dirname + './public/views/signup.ejs'));
});

pp.post('/save',(req,res)=> {

    });


app.post('/auth',(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {

        connection.query("SELECT * FROM users_account WHERE username = ? AND password = ?", [username, password], function (error, results, fields) {

            if (results.length > 0) {
                req.session.loggedin = true, req.session.username = username;res.redirect('/activity');
            }
            else
                {
                res.send('Incorrect Username or Password!');
            }
        res.end();
       })
    }
});

app.get('/logout',(req,res)=>{
    req.session.destroy( (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});



app.listen(port ,() =>{
    console.log('App is running on port:' ,port)
});

