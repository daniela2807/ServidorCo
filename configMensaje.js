const nodemailer = require('nodemailer');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'bestgymsmartgym@gmail.com', // Cambialo por tu email
            pass: 'kbjenrlncpspqylo' // Cambialo por tu password
        }
    });
    const mailOptions = {
        from: `<${formulario.Correo}>`,
        to: 'bestgymsmartgym@gmail.com', // Cambia esta parte por el destinatario
        subject: `${formulario.Asunto}`,
        html: `
        <div style="background-color: #303030;">
        <div style="color: chartreuse;"> 
        <h1>Dudas SmartGym</h1>
             <h3>Nombre de Usuario:</h3> ${formulario.Nombre} 
             <h3>Apellido:</h3> ${formulario.Apellido} 
            <h3>E-mail:</h3> ${formulario.Correo} 
            <h3>Mensaje:</h3> ${formulario.Mensaje} </div></div>
            `
    };
    transporter.sendMail(mailOptions, (err, info)  =>{
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}