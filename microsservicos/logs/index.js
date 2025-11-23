import express, { json } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const app = express()
app.use(json());

const UUID = uuidv4();
const today = new Date();
let logs = [];

app.post('/register/log', async (req, res) => {
    const event = req.body;

    logs = [...logs, {data: event, logId: UUID, date: today, type: event.type}];
    axios.post('http://localhost:10000/eventos', {
      type: `log - ${event.type}`,
      payload: event
    });
    res.status(200).json('Log registrado');
});

app.get('/logs', async (req, res) => {
    res.status(200).json(logs);
});

const port = 2333
app.listen(port, () => console.log(`Lembretes. Porta ${port}.`));
