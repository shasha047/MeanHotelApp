require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');

var routes = require('./api/routes');

app.set('port',3000);

// app.use(function(req, res, next) {
//   console.log(req.method, req.url);
//   next();
// });


app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

app.use('/api',routes);


// app.get('/json',function(req,res){
//     console.log("Get the json data");
//     res
//     .status(200)
//     .json({"jsonData" : true});
// });

var server = app.listen(app.get('port'),function(){
    var port = server.address().port;
    console.log('app listening on port '+ port);    
});

// console.log('Me First');
