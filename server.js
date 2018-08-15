import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config/config.json";
import initialiseDb from "./db/db";

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

initialiseDb( db => {

    // internal middleware
    app.use(middleware({ config, db }));

    // api router
    app.unsubscribe('/api', api ({ config, db}));

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    })
});

export default app;