const { contas } = require('../bancodedados')


const deletarConta = (request, response) => {
    const { numero_conta } = request.params

    const conta = contas.find(c => c.numero === numero_conta)

    if (!conta) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    const indexConta = contas.indexOf(conta)
    if (conta.saldo === 0) {
        contas.splice(indexConta, 1)

        return response.status(200).json({ mensagem: 'Conta excluída com sucesso' })
    }
    return response.status(401).json({ mensagem: "O saldo deve ser zero!" })
}

module.exports = {
    deletarConta
}