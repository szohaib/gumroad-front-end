const express = require('express');
const app = express();

app.use(express.static('./src/public'));
app.use('/dist',express.static('./dist'));
app.use('/assets',express.static('./assets'));


app.listen(3000, function () {
    console.log("Website running at http://localhost:3000");
});