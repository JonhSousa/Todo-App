var mysql = require('mysql');

function createDBConnection(){

    if(!process.env.NODE_ENV){

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'atividades'
        });
    }

    if(process.env.NODE_ENV === 'test'){

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'atividades_test'
        });
    }

    if(process.env.NODE_ENV === 'production'){

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'atividades_prod'
        });
    }
}

//Wrapper - Função de embrulho para outra função
module.exports = function(){
    return createDBConnection;
};