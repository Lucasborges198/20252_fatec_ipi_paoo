const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const port = 6565
app.listen(port, async () => { 
  console.log (`Consulta. Porta ${port}.`)
  const resp = await axios.get('http://localhost:10000/eventos')
  //iterar sobre o corpo da resposta, pegando cada evento, e fazendo seu tratamento usando o mapa de funções
  for (let evento of resp.data){
      try{
        funcoes[evento.type](evento.payload)
      }
      catch(e){}
  }
})

app.get('/status', (req, res) => {
  res.status(200).json();
})