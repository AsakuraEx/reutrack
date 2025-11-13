const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy'); 
const nodemailer = require('nodemailer'); 
const path = require('path');

const accessToken = db.personal_access_token;

//Variable utilizada para el envio de correos
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS,
    }
});

// Enviar codigo de 2FA
// Autor: Walter Romero
// Fecha: 21/07/2025 hora: 09:00 a.m
exports.send2FACode = async function send2FACode(user) {
    try {
        let secret = user.two_factor_secret;

        // Si el usuario no tiene un secret 2FA, generarlo y guardarlo
        if (!secret) {
            const newSecret = speakeasy.generateSecret();
            secret = newSecret.base32;
            await db.users.update({ two_factor_secret: secret }, { where: { id: user.id } });
        }
        
        const code = speakeasy.totp({
            secret: secret,
            encoding: process.env.TWO_FACTOR_ENCODING,
            window: process.env.TWO_FACTOR_WINDOW,
            step: process.env.TWO_FACTOR_STEP, 
          });
              
        // Envia el codigo 2FA mediante correo electronico
        const mailOptions = {
<<<<<<< HEAD
            from: process.env.MAIL_FROM,
=======
            from: '"Notificación Requerimientos" '+ process.env.MAIL_FROM,
>>>>>>> cbee2de73b8d7f53c4aabbfb8a11f3d1f3bf5081
            to: user.email,
            subject: 'REUTRACK - Código de autenticación',
            html: `
                <div style="text-align: center; font-family: Arial, sans-serif;">
                    <div style="background-color: #f9f9f9; border-radius: 10px">
                        <img src="cid:logo_reutrack" style="width: 300px;">
                    </div>    
                    <div style="background-color: #F6EDFF; border-radius: 10px; margin-top: 12px; padding-top:8px; padding-bottom: 8px">
                        <h2>Su código de autenticación</h2>
                        <center>
                            <div style="width: 6.5rem;">
                                <p style="font-size: 24px; font-weight: bold; color: #A855F7; border: 2px solid #A855F7; ">${code}</p>
                            </div>
                        </center>
                        
                        <p>Ingrese este código en la plataforma para continuar con su autenticación.</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'Logo-reutrack-fondo-blanco.png',
                    path: path.join(__dirname, '../public/images/Logo-reutrack-fondo-blanco.png'), 
                    cid: 'logo_reutrack'
                }
            ]
        };
        
        await db.users.update({ 
            two_factor_secret: secret.base32,
        },
            { where: { id: user.id } 
          });

        await transporter.sendMail(mailOptions);
        return 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Inicio de sesión
// Autor: Walter Romero
// Fecha: 21/07/2025 hora: 09:00 a.m
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await db.users.findOne({ where: { email: email }});

        if (!user) {
            return res.status(HttpCode.HTTP_OK).json({ error: 'El usuario al que intenta acceder, no existe' });
        }
        else if (user.id_estado == 5){
            return res.status(HttpCode.HTTP_OK).json({ error: 'El usuario está deshabilitado' });
        }
        if (bcrypt.compareSync(password, user.password)) {
            // Generate and send 2FA code
            await this.send2FACode(user);
            res.status(HttpCode.HTTP_OK).json({exito: 'Se ha enviado un código a su correo electrónico registrado'});
        } else {
            return res.status(HttpCode.HTTP_OK).json({ error: 'Las credenciales son incorrectas' });
        }
    } catch (error) {
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

// Verificar el 2FA ingresado
// Autor: Walter Romero
// Fecha: 21/07/2025 hora: 09:00 a.m
exports.verify2fa = async (req, res) => {
    try {
        const { email, code } = req.body; 

        let user = await db.users.findOne({where: { email: email }});
        
        if (!user || !user.two_factor_secret) {
            return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: "Usuario no encontrado o 2FA no configurado" });
        }
        
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            token: code,
            encoding: process.env.TWO_FACTOR_ENCODING,
            window: process.env.TWO_FACTOR_WINDOW,
            step: process.env.TWO_FACTOR_STEP,
          });
          
        if (verified) {
            await accessToken.destroy({where: { id_usuario: user.id }});
            await db.users.update({ two_factor_secret: null},{ where: { id: user.id }});
            
            const token = jwt.sign({
                id: user.id,
                nombre: user.nombre,
                id_rol: user.id_rol,
                first_session: user.first_session
            }, 
            process.env.SECRET_ACCESS_TOKEN, 
            { expiresIn: "12h" });
            
            await accessToken.create({ 
                id_usuario: user.id,
                token: token,
                expires_in: new Date(Date.now() + (12 * 60 * 60 * 1000)) // Updated to 12 hours
            });
            
            res.status(HttpCode.HTTP_OK).json({
                token: token,
            });
        } else {
            res.status(HttpCode.HTTP_OK).json({ error: 'Código de autenticación incorrecto o caducado' });
        }
    } catch (error) {
        console.error(error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

// Cerrar sesión
// Autor: Walter Romero
// Fecha: 21/07/2025 hora: 09:00 a.m
exports.logout = async (req, res) => {
    try {
        const usuario = req.body.id;
        await accessToken.destroy({
            where: { id_usuario: usuario }
        });
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}




// Enviar codigo para actualización de contraseña
// Autor: Francisco Escobar
// Fecha: 01/10/2025 hora: 2:30 p.m
exports.sendCodePassword = async function sendCodePassword(req, res) {
    try {

        const {email} = req.body;

        let user = await db.users.findOne({ where: { email: email }});

        if (!user) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'El usuario al que intenta acceder, no existe' });
        }
        else if (user.id_estado == 5){
            return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El usuario está deshabilitado' });
        }

        let secret = user.two_factor_secret;

        // Si el usuario no tiene un secret 2FA, generarlo y guardarlo
        if (!secret) {
            const newSecret = speakeasy.generateSecret();
            secret = newSecret.base32;
            await db.users.update({ two_factor_secret: secret }, { where: { id: user.id } });
        }
        
        const code = speakeasy.totp({
            secret: secret,
            encoding: process.env.TWO_FACTOR_ENCODING,
            window: process.env.TWO_FACTOR_WINDOW,
            step: process.env.TWO_FACTOR_STEP, 
          });
              
        // Envia el codigo 2FA mediante correo electronico
        const mailOptions = {
            from: '"Notificación Requerimientos" '+ process.env.MAIL_FROM,
            to: user.email,
            subject: 'REUTRACK - Código de verificación para actualización de contraseña',
            html: `
                <div style="text-align: center; font-family: Arial, sans-serif;">
                    <div style="background-color: #f9f9f9; border-radius: 10px">
                        <img src="cid:logo_reutrack" style="width: 300px;">
                    </div>    
                    <div style="background-color: #F6EDFF; border-radius: 10px; margin-top: 12px; padding-top:8px; padding-bottom: 8px">
                        <h2>Su código de verificación es el siguiente</h2>
                        <center>
                            <div style="width: 6.5rem;">
                                <p style="font-size: 24px; font-weight: bold; color: #A855F7; border: 2px solid #A855F7; ">${code}</p>
                            </div>
                        </center>
                        
                        <p>Ingrese este código en la plataforma para recuperar su cuenta en Reutrack.</p>
                        <p>Si no solicitó este cambio, puede ignorar este correo electrónico.</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'Logo-reutrack-fondo-blanco.png',
                    path: path.join(__dirname, '../public/images/Logo-reutrack-fondo-blanco.png'), 
                    cid: 'logo_reutrack'
                }
            ]
        };
        
        await db.users.update({ 
            two_factor_secret: secret.base32,
        },
            { where: { id: user.id } 
          });

        await transporter.sendMail(mailOptions);
        res.status(HttpCode.HTTP_OK).json({exito: 'Se ha enviado un código a su correo electrónico registrado'});
        return
    } catch (error) {
        console.error(error);
        throw error;
    }

}

// Validar código para actualización de contraseña
// Autor: Francisco Escobar
// Fecha: 01/10/2025 hora: 2:30 p.m
exports.verifyCodePassword = async (req, res) => {
    try {
        const { email, codigo } = req.body; 

        let user = await db.users.findOne({where: { email: email }});
        
        if (!user || !user.two_factor_secret) {
            return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: "El usuario no existe" });
        }
        
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            token: codigo,
            encoding: process.env.TWO_FACTOR_ENCODING,
            window: process.env.TWO_FACTOR_WINDOW,
            step: process.env.TWO_FACTOR_STEP,
          });
          
        if (verified) {
            await accessToken.destroy({where: { id_usuario: user.id }});
            await db.users.update({ two_factor_secret: null},{ where: { id: user.id }});
            
            const token = jwt.sign({
                id: user.id,
                password_reset: true
            }, 
            process.env.SECRET_ACCESS_TOKEN, 
            { expiresIn: "10min" });
            
            await accessToken.create({ 
                id_usuario: user.id,
                token: token,
                expires_in: new Date(Date.now() + (1 * 10 * 60 * 1000)) // Updated to 10 min
            });
            
            res.status(HttpCode.HTTP_OK).json({
                token: token,
            });
        } else {
            res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Código de verificación incorrecto o caducado' });
        }
    } catch (error) {
        console.error(error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
