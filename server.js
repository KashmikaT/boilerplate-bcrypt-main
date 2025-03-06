'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt'); // Ensure bcrypt is correctly required

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
    console.log("Async Hash:", hash); // Log the generated hash

    // Compare async
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Async Password Match:", res); // Should print true

        // Compare with wrong password
        bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Async Wrong Password Match:", res); // Should print false
        });
    });
});
//END_ASYNC

//START_SYNC
const syncHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("Sync Hash:", syncHash); // Log the generated sync hash

// Compare sync
const syncResult = bcrypt.compareSync(myPlaintextPassword, syncHash);
console.log("Sync Password Match:", syncResult); // Should print true

// Compare with wrong password
const syncWrongResult = bcrypt.compareSync(someOtherPlaintextPassword, syncHash);
console.log("Sync Wrong Password Match:", syncWrongResult); // Should print false
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
});
