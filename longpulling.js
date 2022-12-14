const express = require('express');
const cors = require('cors');
const events = require('node:events'); //для того чтобы по определеному событию возвращать ответ на клиент

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
    app.get('/', (req, res) => {
        res.send('Start page Long Pulling')
    })
    start();
// START APP----------------------------------------




// LONG-PULLING START-------------------------------

    const emitter = new events.EventEmitter(); //вызов событий и подписка на них
    // create web-socket

    app.get('/get-messages', (req, res) => {
        emitter.once('newMessage', (message) => {  //прослушиваем событие с ключем "newMessage" и как только в нем произойдут изменения выводим ответом аргумент "message"
            res.json(message);
        })
        // res.send('my test')
    })
    app.post('/new-messages', (req, res) => {
        const message = req.body;
        emitter.emit('newMessage', message);  //регистрируем новое событие с ключем "newMessage" и содержимым "message"
        res.status(200);
        res.send('message sent');
    })
// LONG-PULLING START-------------------------------

