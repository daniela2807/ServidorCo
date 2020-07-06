const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
   });


//API para calcular el IMC de la persona
app.post('/imc', (req, res) => {
    //Obtenemos los valores del formulario
    console.log(req.body);
    const { sexo, estatura, peso } = req.body;  //con esto hacemos desestructuracion
    //Hacemos el calculo del IMC y si está en sobrepeso o no
    let imc = peso/(estatura*estatura);
    let nivel = ""
    if(imc > 30){
        nivel = "Obesidad";
    } else if(imc > 25){
        nivel = "Sobrepeso";
    } else if(imc > 18.5){
        nivel = "Normal";
    } else {
        nivel = "Bajo Peso"
    }
    res.status(200).send({
        imc: imc,
        nivel: nivel
    });
});

app.listen(3000, () => {
console.log('Servidor corriendo')
});