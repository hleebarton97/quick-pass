const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Render static react build page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

require('./routes/getRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);