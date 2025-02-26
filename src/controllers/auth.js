const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy'); 
const nodemailer = require('nodemailer'); 
const path = require('path');

const accessToken = db.personal_access_token;

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS,
    }
});

// Function to send 2FA code via email
exports.send2FACode = async function send2FACode(user) {
    try {
        let secret = user.two_factor_secret;

        // Si el usuario no tiene un secreto 2FA, generarlo y guardarlo
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
              
        // Send the 2FA code via email
        const mailOptions = {
            from: process.env.MAIL_USER,
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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await db.users.findOne({ where: { email: email }});

        if (!user) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Usuario no encontrado' });
        }
        if (bcrypt.compareSync(password, user.password)) {
            // Generate and send 2FA code
            await this.send2FACode(user);
            res.status(HttpCode.HTTP_OK).json({exito: "El codigo de verificacion se ha enviado al correo"});
        } else {
            return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.verify2fa = async (req, res) => {
    try {
        const { email, code } = req.body; 
        
        let user = await db.users.findOne({where: { email: email }});
        
        if (!user || !user.two_factor_secret) {
            return res.status(400).json({ error: "Usuario no encontrado o 2FA no configurado" });
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
                // Remove the two-factor authentication secret after token creation
                id_usuario: user.id,
                token: token,
                expires_in: new Date(Date.now() + (12 * 60 * 60 * 1000)) // Updated to 12 hours
            });
            
            res.status(HttpCode.HTTP_OK).json({
                token: token,
            });
        } else {
            res.status(HttpCode.HTTP_UNAUTHORIZED).json({ error: 'Código de autenticación incorrecto' });
        }
    } catch (error) {
        console.error(error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

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
