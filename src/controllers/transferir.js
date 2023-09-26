const { contas, transferencias } = require('../bancodedados')
const moment = require('moment-timezone')

const transferir = (request, response) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = request.body
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    }

    const conta1 = contas.find(c => c.numero === numero_conta_origem)
    const conta2 = contas.find(c => c.numero === numero_conta_destino)

    if (!conta1 || !conta2) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    if (!senha || senha !== conta1.usuario.senha) {
        return response.status(401).json({ mensagem: "A senha informada é inválida!" })
    }

    if (conta1.saldo <= 0) {
        return response.status(401).json({ mensagem: "Não há valor para transferência!" })
    }

    conta1.saldo -= valor;


    conta2.saldo += valor

    transferencias.push({
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor, data: moment().tz('America/Sao_Paulo').format()
    });

    return response.status(200).json({ mensagem: 'Transferência realizada com sucesso' })

}


module.exports = {
    transferir
}