var express = require('express');
var app = express();

app.use(express.static('public'));

// routes
//app.use('/api/email', require('./routes/api/email'));
//app.use('/', require('./index.html'));

// error handler
app.use(function(err, req, res, next) {
    
    res.status(err.status || 500);
    console.log(err);
    console.log(err.stack);

});

module.exports = app;
