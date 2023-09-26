const { contas } = require('../bancodedados')


const saldo = (request, response) => {
    const { numero_conta, senha } = request.query

    const conta = contas.find(c => c.numero === numero_conta)

    if (!conta) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    if (!numero_conta || numero_conta !== conta.numero) {
        return response.status(401).json({ mensagem: "O número da conta informada é inválido!" })
    }


    if (!senha || senha !== conta.usuario.senha) {
        return response.status(401).json({ mensagem: "A senha informada é inválida!" })
    }

    return response.status(200).json(conta.saldo)
}

module.exports = {
    saldo
}