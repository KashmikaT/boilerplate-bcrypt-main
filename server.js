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

    // Now compare the hashed password with the original password
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Password Match:", res); // Should print true

        // Now test with a different password
        bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Wrong Password Match:", res); // Should print false
        });
    });
});
//END_ASYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
});
