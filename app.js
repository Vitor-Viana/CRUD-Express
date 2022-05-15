const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const urlencodeParser = bodyParser.urlencoded({extended:false})

app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

const cliente = require ('./models')
let clientes = new Array ()
clientes.push(cliente(
        'Vítor Viana', 
        24,
        99999999999,
        999999999,
        'vitor@gmail.com'
        ))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/inserir', function(req, res) {
    res.render('inserir')
})

app.post('/inserindo', urlencodeParser, function(req, res) {
    clientes.push(cliente (
        req.body.nome,
        req.body.idade,
        req.body.cpf,
        req.body.telefone,
        req.body.email
    ))
    res.render('inserindo', {nome:req.body.nome})
})

app.get('/lista', function(req, res) {
    res.render('lista', {clientes:clientes})
})

app.get('/excluir/:id', function(req, res) {
    clientes.splice(req.params.id, 1)
    
    res.redirect('/lista')
})

app.get('/atualizar/:id', function(req, res) {
    res.render('atualizar', {cliente:clientes[req.params.id], id:req.params.id})
})

app.post('/controleDeAtualizacao/:id', urlencodeParser, function(req, res) {
    clientes[req.params.id].nome = req.body.nome
    clientes[req.params.id].idade = req.body.idade
    clientes[req.params.id].cpf = req.body.cpf
    clientes[req.params.id].telefone = req.body.telefone
    clientes[req.params.id].email = req.body.email

    res.redirect('/lista')
})

app.listen(3000, function(req, res) {
    console.log('O servidor está rodando! http://localhost:3000/')
})
