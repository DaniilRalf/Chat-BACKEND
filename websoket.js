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
    app.get('/', (req, res) => {
        res.send('Start page Web Socket')
    })
    start();
// START APP----------------------------------------



// START WEB SOCKET---------------------------------------
    const WS = require('ws');
    const wss = new WS.Server({
        port: 7001
    }, () => {
        console.log('WEB SOCKET SERVER START ON PORT - 7001')
    });


    wss.on('connection', function connection(ws){  //при подключении пользователя к ВС будет отрабатывать ф-ция
        ws.on('message', function (message){
            message = JSON.parse(message);
            switch (message.event){
                case 'message':
                    broadcastMessage(message);
                    break;
                case 'message':
                    broadcastMessage(message);
                    break;
            }
        })
    })


    function broadcastMessage(message){ //Функция рассылки сообщенй всем подключенным пользователям
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message));
        })
    }
// START WEB SOCKET---------------------------------------
