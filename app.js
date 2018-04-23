const express = require('express')
const app = express()

app.use('/', express.static('public'))

app.listen(2002, function () {
    console.log("app listening on port 2002");
});