// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const xml2js = require('xml2js');
var http = require('http');
var fs = require('fs');
var concat = require('concat-stream');

const port = 8000;
require('./app/routes')(app, xml2js);
app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.get('/cure', (req, resp) => {
    var parser = new xml2js.Parser();

    parser.on('error', function(err) { console.log('Parser error', err); });

    var data = '';
    http.get('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml', function(res) {

        res.pipe(concat(function(buffer) {
            var str = buffer.toString();


            // console.log(str)
            parser.parseString(str, function(err, result) {
                resp.send(result['gesmes:Envelope'].Cube[0].Cube);
            });
        }));
    });
})