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
            descricao:"nova atividade"
        }).expect(400,done);
    });

    it('#cadastro de nova atividade com dados válidos',function(done){
        request.post('/atividades')
        .send({
            titulo:"Titulo da atividade",
            descricao:"nova atividade",
            prioridade: "Máxima"
        }).expect(302,done);
    });
});
