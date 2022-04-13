    var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
gpio.setup(12, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.get('/', function(req, res){ 
            res.render('index',{status:"Waiting for your answer..."});
});

//Correct Answer
app.get('/correct', function(req, res){
gpio.write(12, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin 12');
            console.log(path.join(__dirname, 'public'));
            return res.render('index', {status: "Answer Was Correct"});
    });
});

//Unlock Door
app.get('/unlock', function(req, res){
gpio.write(16, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin 16');
            console.log(path.join(__dirname, 'public'));
            return res.render('index', {status: "Answer Was Correct"});
    });
gpio.write(12, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin 12');
            console.log(path.join(__dirname, 'public'));
            return res.render('index',{status: "Answer Was Wrong"});
    });
gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written false to pin 10');
            console.log(path.join(__dirname, 'public'));
            return;
    });
});

//Incorrect answer
app.get('/Incorrect', function(req, res){
gpio.write(12, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin 12');
            console.log(path.join(__dirname, 'public'));
            return res.render('index',{status: "Answer Was Wrong"});
    });
gpio.write(11, true, function(err) {
        if (err) throw err;
        console.log('Written true to pin 10');
            console.log(path.join(__dirname, 'public'));
            return;
    });
});

//restart
app.get('/Off', function(req, res){
gpio.write(12, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin 12');
            console.log(path.join(__dirname, 'public'));
            return res.render('index',{status: "Answer Was Wrong"});
    });
gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written false to pin 10');
            console.log(path.join(__dirname, 'public'));
            return;
    });

gpio.write(16, false, function(err) {
        if (err) throw err;
        console.log('Written false to pin 16');
            console.log(path.join(__dirname, 'public'));
            return;
    });
});
app.listen(4000, function () {
  console.log('Simple LED Control Server Started on Port: 4000!')
})
