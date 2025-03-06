'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt'); // Corrected from 'becrypt' to 'bcrypt'
fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Async Hash:", hash);
});
//END_ASYNC

//START_SYNC
try {
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log("Sync Hash:", hash);
} catch (err) {
    console.error(err);
}
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
