const express = require('express');


// CONSTANTS---------------------------------------
    const PORT = 7000;
    const app = express();
    app.use(express.json());

    const room = {
        room: [],
        message: ['test'],
    }
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
        // res.send('Server started');
        res.json(room);
    })
    start();
// START APP----------------------------------------
