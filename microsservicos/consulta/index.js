const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

/*
{
  1: {
    id: 1,
    texto: "oi",
    observacoes: [{id: 1000, texto: abc, lembreteId: 1}]
  },
  2: {
    id: 2,
    texto: "oi2",
  }
}

[]
*/
const baseConsolidada = {}

const funcoes = {
  //a função deve receber um lembrete e cadastrá-lo na base consolidada
  lembrete: (lembrete) => {
    baseConsolidada[lembrete.id] = lembrete
  },
  // id, texto, lembreteId
  ObservacaoCriada: (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsolidada[observacao.lembreteId]['observacoes'] = observacoes
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes']
    const indice = observacoes.findIndex(o => o.id === observacao.id)
    observacoes[indice] = observacao
  },
  logs: (logs) => {
    baseConsolidada[logs.id] = logs
  },
  consulta: (consulta) => {
    baseConsolidada[consulta.id] = consulta
  },
  estatistica: (estatistica) => {
    baseConsolidada[estatistica.id] = estatistica
  },
  classificacao: (classificacao) => {
    baseConsolidada[classificacao.id] = classificacao
  },
  observacao: (observacao) => {
    baseConsolidada[observacao.id] = observacao
  }
}

//disponibiliza a base consolidada
app.get('/lembretes', (req, res) => {
  //devolver a base consolidada como um json
  res.json(baseConsolidada)  
})

//recebe eventos, viabilizando a atualização da base
app.post('/eventos', (req, res) => {
  try {
    // 1. Separe o reqType do resto dos dados
    // 'reqType' fica na variável isolada, 'gruposDeEventos' fica com os arrays
    const { ...gruposDeEventos } = req.body; 

    // 2. Itere APENAS sobre os grupos de eventos (ignorando reqType)
    Object.values(gruposDeEventos).flat().forEach((item) => {
        const { type, payload } = item;

        // 3. Verificação de segurança
            funcoes[type](payload);
    });
    
  } catch (e) {
    console.error('Erro ao processar eventos:', e); // Nunca deixe o catch vazio!
    res.status(500).send('Erro interno'); // Avise quem chamou que deu erro
    return;
  }
  
  res.end();
})

const port = 6000
app.listen(port, async () => { 
  console.log (`Consulta. Porta ${port}.`)
  await axios.get('http://localhost:10000/eventos', { params: {type: 'consulta'}}).then((resp) => {
    const eventos = Array.isArray(resp?.data) ? resp?.data : (resp.data?.consulta || []);
    //iterar sobre o corpo da resposta, pegando cada evento, e fazendo seu tratamento usando o mapa de funções
    for (let evento of eventos){
        try{
          funcoes[evento.type](evento.payload)
        }
        catch(e){console.log(e)}
    }
  })
})