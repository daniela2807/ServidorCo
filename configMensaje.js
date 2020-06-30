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
             <strong>Nombre:</strong> ${formulario.Nombre} <br/>
             <strong>Apellido:</strong> ${formulario.Apellido} <br/>
            <strong>E-mail:</strong> ${formulario.Correo} <br/>
            <strong>Mensaje:</strong> ${formulario.Mensaje}
            `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}