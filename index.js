const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json())

let idTemaSequencia = 2
let idIntegranteSequencia = 1

const temas = [{
  id: 1,
  nome: "HTTP/REST",
  integrantes: []
}]

app.get('/temas', (req, res) => {
  return res.status(200).json(temas)
})

app.post('/temas', (req, res) => {
  const {nome, integrantes = []} = req.body

  const novoTema = {
    id: idTemaSequencia,
    nome,
    integrantes
  }

  idTemaSequencia += 1;

  temas.push(novoTema)

  return res.status(200).json(novoTema)
})

app.get('/temas/:idTema/integrantes', (req, res) => {
  const {idTema} = req.params

  const tema = temas.find(tema => tema.id === Number(idTema))

  if (!tema) return res.status(404).json({
    mensagem: "Tema não encontrado."
  })

  return res.status(200).json(tema.integrantes)
})

app.post('/temas/:idTema/integrantes', (req, res) => {
  const {idTema} = req.params

  const tema = temas.find(tema => tema.id === Number(idTema))

  if (!tema) return res.status(404).json({
    mensagem: "Tema não encontrado."
  })

  const {nome} = req.body

  const novoIntegrante = {
    id: idIntegranteSequencia,
    nome,
  }

  idIntegranteSequencia += 1;

  tema.integrantes.push(novoIntegrante)

  return res.status(200).json(novoIntegrante)
})

app.listen(3333, () => {
  console.log('Rodando a API na porta 3333!')
})