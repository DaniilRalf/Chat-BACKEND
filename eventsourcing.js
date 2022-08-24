const express = require('express');
const cors = require('cors');
const events = require("node:events");

// CONSTANTS---------------------------------------
    const PORT = 7000;
    const app = express();
    // app.use(cors());
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
    app.get('/', (req, res) => {
        res.send('Start page Event Sourcing')
    })
    start();
// START APP----------------------------------------



//EVENT SOURCING-----------------------------------
    const emitter = new events.EventEmitter(); //вызов событий и подписка на них

    app.get('/connect', (req, res) => {
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'X-Accel-Buffering': 'no'
        });
        emitter.on('newMessage', (message) => {
            res.write(`data: ${JSON.stringify(message)} \n\n`);
        })
    })
    app.post('/new-messages', (req, res) => {
        const message = req.body;
        emitter.emit('newMessage', message);  //регистрируем новое событие с ключем "newMessage" и содержимым "message"
        res.status(200);
        res.send('message sent');
    })
//EVENT SOURCING-----------------------------------
