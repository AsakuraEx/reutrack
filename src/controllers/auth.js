const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const accessToken = db.personal_access_token

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await db.users.findOne({
            where: {email: email}
        })
    
        if (!user) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Usuario no encontrado'})
        }
        if(bcrypt.compareSync(password, user.password)){
            await accessToken.destroy({
                where: {id_usuario: user.id}
            })
            const token = jwt.sign({
                id: user.id,
                nombre: user.nombre,
                id_rol: user.id_rol,
                first_session: user.first_session
            }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "12h"})
            await accessToken.create(
                {
                    id_usuario: user.id,
                    token: token,
                    expires_in: new Date(Date.now() + (12 * 60 * 60 * 1000)) // Updated to 12 hours
                }
            )
            res.status(HttpCode.HTTP_OK).json({
                token: token,
            })
        }
        else {
            return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ error: 'Credenciales incorrectas' })
        }
    } catch (error) {
        console.error(error)
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.logout = (req, res) => {
    const usuario = req.body.id
    try {
        accessToken.destroy({
            where: {id_usuario: usuario}
        })
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        console.log(err)
        res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        });
    }
    res.end();
}
