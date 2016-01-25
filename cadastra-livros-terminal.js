var http = require('http');

var configuracoes = {
    hostname : 'localhost',
    port : 3000,
    path : '/atividades',
    method: 'post',
    headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
    }
};

var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo:'+' '+body);
    });
});

var produto = {
    titulo: '',
    descricao: 'Node, javascript e um pouco sobre http',
    preco: 100
};

client.end(JSON.stringify(produto));