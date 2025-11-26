import express, { json } from 'express';
import axios from 'axios';
const app = express()
app.use(json())
import { calculoEstatisca } from '../../js/calculos_estatisticas/index.js';

const data = {
    reminders: [],
    observations: []
};

app.post('/lembranca/estatistica', async (req, res) => {
    const event = req.body;
    data.reminders = [...data.reminders, {type: event.type, id: event.id}];
    axios.post('http://localhost:10000/eventos', {
      type: 'lembrete',
      payload: event
    });
    res.status(200).json('Lembrança registrada com sucesso');
});

app.post('/observacao/estatistica', async (req, res) => {
    const event = req.body;
    data.observations = [
        ...data.observations,
        {
            type: event.status,
            id: event.id,
            content: event.texto,
            observationId: event.lembreteId
        }
    ];
    axios.post('http://localhost:10000/eventos', {
      type: 'ObservaçãoRegistrada',
      payload: event
    });
    res.status(200).json('Observação registrada');
});

app.get('/estatistica', async (req, res) => {
    res.status(200).json(calculoEstatisca(data));
});


const port = 8080
app.listen(port, () => 
    console.log(`Lembretes. Porta ${port}.`),
    axios.get('http://localhost:10000/eventos', {params: {type: 'estatistica'}}).then(({resp}) => {
    const eventos = Array.isArray(resp?.data) ? resp?.data : (resp?.data?.estatistica || []);
    for(let evento of eventos){
      try{
        funcoes[evento.type](evento.payload)
      }
      catch(e){}
    }
  })
)