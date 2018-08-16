const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parse");
const cors = require("cors");
const config = require("./config/config.json");
const initialiseDb = require("./db/db");

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware for handling cors
app.use(cors({
    exposedHeaders:config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

initialiseDb(function(db){

    // internal middleware
    app.use(middleware({ config, db }));

    // api router
    app.unsubscribe('/api', api ({ config, db}));

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    })
});

module.exports = app;