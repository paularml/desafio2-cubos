const { contas } = require('../bancodedados')


const atualizaconta = (request, response) => {
    const { numeroConta } = request.params
    const { novoNome, novoCpf, novoData_nascimento, novoTelefone, novoEmail, novoSenha } = request.body
    if (!novoNome || !novoCpf || !novoData_nascimento || !novoTelefone || !novoEmail || !novoSenha) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    }


    const conta = contas.find(c => c.numero === numeroConta)

    if (!conta) {
        return response.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    const contaExistente = contas.find(c => c.usuario.cpf === novoCpf && c.numero !== numeroConta || c.usuario.email === novoEmail && c.numero !== numeroConta)
    if (contaExistente) {
        return response.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado" })

    }


    conta.usuario.nome = novoNome
    conta.usuario.cpf = novoCpf
    conta.usuario.data_nascimento = novoData_nascimento
    conta.usuario.telefone = novoTelefone
    conta.usuario.email = novoEmail
    conta.usuario.senha = novoSenha

    return response.status(200).json({ mensagem: 'Conta atualizada com sucesso' });
}

module.exports = {
    atualizaconta
}