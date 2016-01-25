//configuração de rota Atividades
module.exports = function(app){
    var listaAtividades = function(req,res,next){
        //infraestrutura de db
        var connection = app.infra.connectionFactory();

        var AtividadesBanco = new app.infra.AtividadesDAO(connection);

        AtividadesBanco.lista(function(err,results){

            if(err){
                return next(erros);
            }
            // Content Negotiation - Client side decide what it wants to receive
            res.format({
                html: function(){
                    res.render('atividades/lista',{lista : results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
        //consulta
    };
    //Renderização de form usando validação de campos
    var renderForm = function(res,err,act){
        res.render('atividades/form',{errosValidacao:err,atividade:act});
    }


    app.get('/atividades',listaAtividades);

    app.get('/atividades/form',function(req,res){
        renderForm(res,'','');
    });

    app.post('/atividades/edita',function(req,res){

        var atividadeEdit = req.body;
        console.log(req.body);

        var connection = app.infra.connectionFactory();

        var AtividadesBanco = new app.infra.AtividadesDAO(connection);



        AtividadesBanco.listaPorId(atividadeEdit.id,function(err,results){

            if(err){
                return next(erros);
            }
            // Content Negotiation - Client side decide what it wants to receive
            res.format({
                html: function(){
                    res.render('atividades/edita_form',{atividade : results});

                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
    });

    app.post('/atividades',function(req,res){
        //recebe o corpo da requisição
        var atividade = req.body;

        //Validação de campos usando express-validator
        req.assert('titulo','Título é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.format({
                html: function(){
                    renderForm(res.status(400),erros,Atividade);
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });

            return;
        }

        var connection = app.infra.connectionFactory();
        var AtividadesDAO = new app.infra.AtividadesDAO(connection);
        AtividadesDAO.salva(atividade,function(err,results){
            //Allways redirect after post
            console.log(err);
            res.redirect('/atividades');
        });
    });


    app.post('/atividades/salva_edicao',function(req,res){
        //recebe o corpo da requisição
        var atividade = req.body;

        //Validação de campos usando express-validator
        req.assert('titulo','Título é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.format({
                html: function(){
                    renderForm(res.status(400),erros,Atividade);
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });

            return;
        }

        var connection = app.infra.connectionFactory();
        var AtividadesDAO = new app.infra.AtividadesDAO(connection);
        AtividadesDAO.edita(atividade,function(err,results){
            //Allways redirect after post
            //console.log(err);
            res.redirect('/atividades');
        });
    });

    app.post('/atividades/deleta',function(req,res){
        var atividade = req.body;
        console.log(atividade);

         var connection = app.infra.connectionFactory();
        var AtividadesDAO = new app.infra.AtividadesDAO(connection);
        AtividadesDAO.deleta(atividade,function(err,results){
            //Allways redirect after post
            //console.log(err);
            res.redirect('/atividades');
        });


    })


}
