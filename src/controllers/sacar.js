const { contas, saques } = require('../bancodedados')
const moment = require('moment-timezone')

const sacar = (request, response) => {
    const { numero_conta, valor, senha } = request.body

    const conta = contas.find(c => c.numero === numero_conta)

    if (!conta) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    if (!senha || senha !== conta.usuario.senha) {
        return response.status(401).json({ mensagem: "A senha informada é inválida!" })
    }

    if (conta.saldo <= 0) {
        return response.status(401).json({ mensagem: "Não há valor para saque!" })
    }

    conta.saldo -= valor;


    saques.push({ numero_conta: numero_conta, valor: valor, data: moment().tz('America/Sao_Paulo').format() })

    return response.status(200).json({ mensagem: 'Saque realizado com sucesso' });

}

module.exports = {
    sacar
}