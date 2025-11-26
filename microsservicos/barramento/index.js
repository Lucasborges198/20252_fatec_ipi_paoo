//se o import não funcionar
// const express = require('express')
// const axios = require('axios')
import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())

let eventos = {
  logs: [],
  lembrete: [],
  consulta: [],
  observacao: [],
  estatistica: [],
  classificacao: []
}

//POST /eventos
app.post('/eventos', async (req, res) => {
  const request = req.body
  const requestType = request?.type;
  eventos[requestType] = [ ...eventos[requestType], request];
  console.log(request)
  try{
    await axios.post('http://localhost:4000/eventos', eventos)
  }
  catch(e){}
  try{
    await axios.post('http://localhost:5000/eventos', eventos)
  }
  catch(e){}
  try{
    await axios.post('http://localhost:6000/eventos', eventos)
  }
  catch(e){}
  try{
    await axios.post('http://localhost:7000/eventos', eventos)
  }
  catch(e){}
  res.end()
})


//viabilizar a obtenção da base de eventos
app.get('/eventos', (req, res) => {
  let event = req.body;
  let type = event?.type;
  let filteredResponse = [];
  switch(type) {
    case 'logs':
      filteredResponse = eventos?.logs;
      break;
    case 'lembrete':
      filteredResponse = eventos?.lembrete; 
      break;
    case 'consulta':
      filteredResponse = eventos?.consulta;
      break;
    case 'observacao':
      filteredResponse = eventos?.observacao;
      break;
    case 'estatistica':
      filteredResponse = eventos?.estatistica;
      break;
    case 'classificação':
      filteredResponse = eventos?.classificacao;
      break;
    default:
      filteredResponse = eventos;
      break;
  }
  res.json(filteredResponse);
})


const port = 10000
app.listen(port, () => {
  console.log(`Barramento. Porta ${port}.`)
})