'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt'); // Correctly required

fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';

// START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(hash); // Log async hash

    // Compare async
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res); // Should print true
    });
});
// END_ASYNC

// START_SYNC
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hashSync); // Log sync hash

const resultSync = bcrypt.compareSync(myPlaintextPassword, hashSync);
console.log(resultSync); // Should print true
// END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
});
