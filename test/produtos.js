var express = require('../config/express')();
var request = require('supertest')(express);

describe('AtividadesController',function(){
    it('#listagem json',function(done){
        request.get('/atividadess')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200,done);
    });

    it('#cadastro de nova atividade com dados inválidos',function(done){
        request.post('/atividades')
        .send({
            titulo:"",
            descricao:"novo livro"
        }).expect(400,done);
    });

    it('#cadastro de nova atividade com dados válidos',function(done){
        request.post('/produtos')
        .send({
            titulo:"Título do livro",
            descricao:"novo livro",
            preco:20.50
        }).expect(302,done);
    });
});
