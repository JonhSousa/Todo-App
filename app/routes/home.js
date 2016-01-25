module.exports = function(app){
    app.get('/',function(req,res){
        var connection = app.infra.connectionFactory();
        var AtividadesBanco = new app.infra.AtividadesDAO(connection);
        AtividadesBanco.lista(function(err,results){
            res.render('home/index',{atividades:results});
            });
            connection.end();
        });
    }
