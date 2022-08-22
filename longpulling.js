const express = require('express');
const cors = require('cors');

// CONSTANTS---------------------------------------
const PORT = 7000;
const app = express();
app.use(cors());
app.use(express.json());
// CONSTANTS---------------------------------------


// START APP----------------------------------------
const start = async () => {
    try {
        await app.listen(PORT, () => console.log(`SERVER START ON PORT - ${PORT}`));
    } catch (e) {
        console.log(`ERROR - ${e}`);
    }
}
start();
// START APP----------------------------------------


// LONG-PULLING START-------------------------------
    const events = require('events');
    const emitter = new events.EventEmitter();

    app.get('/get-messages', (req, res) => {
        emitter.once('newMessage', (message) => {
            res.json(message);
        })
    })
    app.post('/new-messages', (req, res) => {
        const message = req.body;
        emitter.emit('newMessage', message);
        res.status(200);
    })
// LONG-PULLING START-------------------------------
