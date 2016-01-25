function AtividadesDAO(connection){
    this._connection = connection;
}

AtividadesDAO.prototype.lista = function(callback){
    console.log("to aqui!")
    this._connection.query('select * from atividade',callback);
}

AtividadesDAO.prototype.listaPorId = function(id,callback){
    this._connection.query('select * from atividade where id=?',id,callback);
}

AtividadesDAO.prototype.salva = function(atividade,callback){
    console.log(atividade.descricao);
    this._connection.query('insert into atividade set ?',atividade,callback);
}

AtividadesDAO.prototype.edita = function(atividade,callback){
    console.log(atividade.descricao);
    this._connection.query('update atividade set ? where id = ? ',[atividade,atividade.id],callback);
}

AtividadesDAO.prototype.deleta = function(atividade,callback){
    console.log(atividade.descricao);
    this._connection.query('delete from atividade where id = ? ',atividade.id,callback);
}


module.exports = function(){
    return AtividadesDAO;
}
