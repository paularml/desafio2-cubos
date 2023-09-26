const { contas, depositos } = require('../bancodedados')
const moment = require('moment-timezone')

const depositar = (request, response) => {
    const { numero_conta, valor } = request.body

    if (!numero_conta || !valor) {
        return response.status(401).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
    }

    const conta = contas.find(c => c.numero === numero_conta)

    if (!conta) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    if (valor <= 0) {
        return response.status(401).json({ mensagem: "O valor de depósito não é válido!" })
    }

    conta.saldo += valor

    depositos.push({ numero_conta: numero_conta, valor: valor, data: moment().tz('America/Sao_Paulo').format() })

    return response.status(200).json({ mensagem: 'Depósito realizado com sucesso' })

}

module.exports = {
    depositar
}