const axios = require('axios')

const express = require('express')
const app = express()
app.use(express.json())

const port = 7878

app.get('/observacao/status', async (req, res) => {
    try {
        const status = await  axios.get(`http://localhost:5000/status`) // observacoes
        res.status(200).json(`observacoesStatus: ${status.status}`);
    }
    catch(err) {
        res.status(400).json(`error: ${err.code}`);
    } 
})

app.get('/barramento/status', async (req, res) => {
    try{
        const status =  await axios.get(`http://localhost:10000/status`)
        res.status(200).json(`barramentoStatus: ${status.status}`)
    }catch(err){
        res.status(400).json(`error: ${err.code}`);
    }
    
})

app.get('/classificacao/status', async (req, res) => {
    try{
        const status = await  axios.get(`http://localhost:7000/status`)
        res.status(200).json(`classificacaoStatus: ${status.status}`)
    }catch(err){
        res.status(400).json(`error: ${err.code}`);
    }
    
})

app.get('/consulta/status', async (req, res) => {
    try{
        const status = await  axios.get(`http://localhost:6000/status`)
        res.status(200).json(`consultaStatus: ${status.status}`)
    }
    catch(err){
        res.status(400).json(`error: ${err.code}`);
    }
   
})

app.get('/lembrete/status', async (req, res) => {
    try{
        const status = await  axios.get(`http://localhost:4000/status`)
        res.status(200).json(`lembreteStatus: ${status.status}`)
    }
    catch(err){
        res.status(400).json(`error: ${err.code}`);
    }
   
})

app.get('/moderacao/status', async (req, res) => {
    try{
        const status =  await axios.get(`http://localhost:6565/status`)
        res.status(200).json(`moderacaoStatus: ${status.status}`)
    }catch(err){
        res.status(400).json(`error: ${err.code}`);
    }
    
})

app.listen(port, async () => { 
  console.log (`Consulta. Porta ${port}.`)
})