module.exports = app => {
    const generate = require('../generate');
    
    // Get all psuedo-random cryptographic strings
    app.get('/api/v1/string/all', (req, res) => {
        let json = generate.JSONFormattedPsuedoRandomCryptoUint8Strings(128);
        res.send(json);
    });
};