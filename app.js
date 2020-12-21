const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
var mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'redes',
    user : 'root',
    password : 'dany',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});


app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
   });

app.get('/getCursos', (req,res) => {
    var data = new Array();
    conexion.query('SELECT * FROM cursos', function (error, results, fields) {
        if (error)
            throw error;
        results.forEach(result => {
            req = results;
            console.log(result);
        });
        res.status(200).json({
            data: results
        })
    });
});

app.delete('/deleteCurso/:nombre',(req,res)=>{
    conexion.query("delete from cursos where nombre = ? ",[req.params.nombre],(err,rows,field)=>{
        if(err){
            res.send(rows)
        }else
        {
            console.log(err);
        }
    })
});

//API para calcular el IMC de la persona
app.post('/insertCurso', (req, res) => {
    //Obtenemos los valores del formulario
    console.log(req.body);
    const { Curso, Hora, Imparte, Lugares,Ubicacion} = req.body;  //con esto hacemos desestructuracion
    conexion.query(`INSERT INTO cursos (nombre,hora,imparte,lugares,ubicacion) values (?,?,?,?,?)`,[Curso,Hora,Imparte,Lugares,Ubicacion]);
});



app.listen(3000, () => {
console.log('Servidor corriendo')
});