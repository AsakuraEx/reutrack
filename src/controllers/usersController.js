const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const bcrypt = require('bcrypt')

exports.index = async (req, res) => {
    try {
        const usuario = await db.users.findAll()
        res.status(HttpCode.HTTP_OK).json(usuario);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.create = async (req, res) => {
    const {name, email, password, perfi, id_estado, rol, remember_token } = req.body;

    try {
        const newUser = await db.users.create({ 
            name, email, password: bcrypt.hashSync(password, 16), perfi, id_estado, rol, remember_token
        });
        res.status(HttpCode.HTTP_CREATED).json(newUser);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const {name, email, password, perfi, id_estado, rol, remember_token } = req.body;
    try {
        await db.proyecto.update({ 
            name, email, password, perfi, id_estado, rol, remember_token
        }, {where: {id: id}});

        const updatedData = await db.proyecto.findByPk(id)
        
        if (!updatedData){
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Register not found'})
        }
        res.status(HttpCode.HTTP_OK).json(updatedData);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

