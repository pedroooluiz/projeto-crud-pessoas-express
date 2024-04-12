const express = require('express')

const router = express.Router()

let listaPessoas = [
    {
        id: 1,
        nome: "Pedro Luiz Rodrigues",
        idade: "22",
        email: "pedro.l.souza@iesb.edu.br",
        telefone: "+55(61)90000-1111"
    },

]

// middlewares de validação
// Validar se o produto existe
function validarPessoa(req, res, next) {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    if (pessoa) {
        req.pessoa = pessoa
        next()
    } else {
        return res.status(404).json({ mensagem: "Pessoa não encontrada!" })
    }
}

// validar os atributos do corpo
function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.id || !dadosRecebidos.nome || !dadosRecebidos.idade || !dadosRecebidos.email || !dadosRecebidos.telefone) {
        return res.status(400).json({ mensagem: "Atenção! Você precisa preencher todos os dados" })
    } else {
        next()
    }
}

// READ -> Buscar todos os produtos
router.get('/pessoas', (req, res) => {
    res.status(200).json(listaPessoas)
})

// READ -> Busca de produto especifico
router.get('/pessoas/:id', validarPessoa, (req, res) => {
    res.json(req.pessoa)
})

// CREATE -> Cadastro de um produto
router.post('/pessoas', validarAtributos, (req, res) => {
    const dados = req.body

    const pessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas.push(pessoa)

    res.status(201).json(
        {
            mensagem: "Pessoa cadastrada com sucesso!",
            pessoa
        }
    )
})

// UPDATE -> Alterar um produto
router.put('/pessoas/:id', validarAtributos, validarPessoa, (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoa => pessoa.id == id)
    
    const pessoa = {
        id: Number(id),
        nome: novosDados.nome,
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    }

    listaPessoas[index] = pessoa

    res.status(200).json(
        {
            mensagem: "Dados da pessoa alterados com sucesso!",
            pessoa
        }
    )
})

// DELETE -> Excluir produto
router.delete('/pessoas/:id', validarPessoa, (req, res) => {
    const id = req.params.id
    const index = listaPessoas.findIndex(pessoa => pessoa.id == id)
    listaPessoas.splice(index, 1)
    res.status(200).json({ mensagem: "Pessoa excluida sucesso!" })
})


module.exports = router