const { contas, banco } = require('../bancodedados')

const listarContas = (request, response) => {
    const { senha_banco } = request.query

    if (!senha_banco || senha_banco !== banco.senha) {
        return response.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }

    return response.status(200).json(contas)
}


module.exports = {
    listarContas
}