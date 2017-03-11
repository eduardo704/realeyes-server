module.exports = function(app, xml2js, http, concat) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
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
};