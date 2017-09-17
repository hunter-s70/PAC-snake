/**
 * Created by hunter_s70 on 10.12.2016.
 */
var express = require("express");
var app = express();
app.use(express.logger());

app.use(express.static('web'));
app.use(express.static('node_modules'));

app.get('/', function(request, response) {
    response.send('Pac_snake game');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});