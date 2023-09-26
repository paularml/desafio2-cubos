const { contas } = require('../bancodedados')

let ultimoNumeroConta = 0
const criarConta = (request, response) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = request.body


    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    }


    const contaExistente = contas.find(c => c.usuario.cpf === cpf || c.usuario.email === email)
    if (contaExistente) {
        return response.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado" })

    }

    const numerosContasExistentes = contas.map(c => Number(c.numero))
    const maiorNumeroContaExistente = Math.max(...numerosContasExistentes)


    const novoNumero = (maiorNumeroContaExistente + 1).toString()


    const novaConta = {
        numero: novoNumero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }


    contas.push(novaConta)

    return response.status(201).json(novaConta)
}

module.exports = {
    criarConta
}