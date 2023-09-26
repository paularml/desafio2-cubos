const { contas, depositos, saques, transferencias } = require('../bancodedados')


const extrato = (request, response) => {
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


    if (senha !== conta.usuario.senha) {
        return response.status(401).json({ mensagem: "Senha inválida!" })
    }

    const extrato = {
        depositos: [],
        saques: [],
        transferenciasEnviadas: [],
        transferenciasRecebidas: []
    }


    for (const deposito of depositos) {
        if (deposito.numero_conta === numero_conta) {
            extrato.depositos.push(deposito)
        }
    }

    for (const saque of saques) {
        if (saque.numero_conta === numero_conta) {
            extrato.saques.push(saque)
        }
    }

    for (const transferencia of transferencias) {
        if (transferencia.numero_conta_origem === numero_conta) {
            extrato.transferenciasEnviadas.push(transferencia)
        }
        if (transferencia.numero_conta_destino === numero_conta) {
            extrato.transferenciasRecebidas.push(transferencia);
        }
    }

    return response.status(200).json(extrato)



}

module.exports = {
    extrato
}