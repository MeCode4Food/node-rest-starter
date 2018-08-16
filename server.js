const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
const connection = require('express-myconnection');
const mysql = require("mysql");
const routes = require('./routes/routes');
const Docs = require('express-api-doc');

let app = express();
app.server = http.createServer(app);

// express api documentation
const dock = new Docs(app);
dock.track({
    path: './docs/examples.txt' // responses and requests will save here
})

dock.generate({
    path: './docs/template.html',
    examples: './docs/examples.txt'
});

// logger
app.use(morgan('dev'));

// 3rd party middleware for handling cors
app.use(cors({
    exposedHeaders:config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use(connection(mysql, config.database));

app.use('*', routes)

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
})

module.exports = app;