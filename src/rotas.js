const express = require('express')
const contas1 = require('./controllers/listarContas')
const contas2 = require('./controllers/criarConta')
const contas3 = require('./controllers/atualizaconta')
const contas4 = require('./controllers/deletarConta')
const contas5 = require('./controllers/depositar')
const contas6 = require('./controllers/sacar')
const contas7 = require('./controllers/transferir')
const contas8 = require('./controllers/saldo')
const contas9 = require('./controllers/extrato')

const rotas = express()

rotas.get('/contas', contas1.listarContas)
rotas.post('/contas', contas2.criarConta)
rotas.put('/contas/:numeroConta/usuario', contas3.atualizaconta)
rotas.delete('/contas/:numero_conta', contas4.deletarConta)
rotas.post('/transacoes/depositar', contas5.depositar)
rotas.post('/transacoes/sacar', contas6.sacar)
rotas.post('/transacoes/transferir', contas7.transferir)
rotas.get('/contas/saldo', contas8.saldo)
rotas.get('/contas/extrato', contas9.extrato)


module.exports = rotas

