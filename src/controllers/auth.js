const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const accessToken = db.personal_access_tokens

exports.login = async (req, res) => {
    try {
        const {correo, password} = req.body
        const user = await accessToken.findOne({where: {email: correo}})
        
        if (!user) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Usuario no encontrado'})
        }
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "1m"})
            await accessToken.create(
                {
                    id_usuario: user.id,
                    token: token,
                    expires_in: new Date(Date.now() + (60 * 1000))
                }
            )
            const login = accessToken.findByPk(user.id,{
                attributes: {exclude: ['id_usuario', 'updatedAt']},
                include: [
                    { model: db.users,
                        as: 'usuario',
                        attributes: ['name'],
                        required: true,
                    },
                    { model: db.ctl_rol,
                        as: 'rol',
                        attributes: ['id','nombre'],
                        required: true,
                    }
                ]
            })
            res.status(HttpCode.HTTP_OK).json(login)
        }
        else {
            return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ error: 'Credenciales incorrectas' })
        }
    } catch (error) {
        console.log(err)
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.logout = (req, res) => {
    try {
        const authHeader = req.headers['cookie']; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(204); // No content
        if(Date.now() > accessToken.expires_at) res.sendStatus(204);
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        });
    }
    res.end();
}