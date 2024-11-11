var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Hey There! This is nodejs app, version 2.0" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World! this is /will page in version 2.0" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, The updated verion works!" }');
});

// New route for the new version
app.get('/new-feature', function (req, res) {
    res.send('{ "response": "Welcome to the new feature in version 2.0!" }');
});
app.listen(process.env.PORT || 3000);
module.exports = app;
