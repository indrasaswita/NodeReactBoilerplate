/**
 * Required External Modules
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const keys = require("./config/keys");

require('dotenv').config({
    path: './server/.env',
});

/**
 * App Variables
 */

const PORT = 8000;
const app = express();
const db = keys.mongoURI;
const api = require("./routes/api");

/**
 *  App Configuration
 */

// @regex for a URL that only have 1 slash ^/([^/]+)/?$
// @regex for not containing api string and only have 1 slash ^/((?!api).)*([^/]+)/?$
// @regex for not containing api string  ^/((?!api).)*$
// @regex for not starts with api  ^/(?!api).*$

app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '..', 'build' ) ) );
app.use( express.static(path.resolve(__dirname, '..', 'build')) );
app.use((req, res, next) => {
    /*const allowedOrigins = [
        'http://127.0.0.1:3000',
        'http://localhost:8000',
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }*/
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json()); // supaya bisa kirim POST dengan JSON body
app.use('^/api', api);


app.use('^/([^/]+)/?$', (req, res, next) => {

    if (req.originalUrl.match('^/api(.*)$')) {
        next();
    } else {
        fs.readFile(path.resolve("./build/index.html"), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('error test - some error happened');
            }

            return res.send(data.replace(
                '<div id="root"></div>',
                '<div id="root">${ReactDOMServer.renderToString(<App />)}</div>'
            ));
        });
    }
});

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected......') )
    .catch(err => console.log("error connect mongo: ", err));

/**
 * Routes Definitions
 */


app.use('^*$', (req, res) => {
    res.status(404).json({message: 'Page Not Found!'});
    return;
});

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log('app launched at PORT: ' + PORT);
});