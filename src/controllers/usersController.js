const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const bcrypt = require('bcrypt')

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const usuario = await db.users.findOne({
            where: {id: id }
        });
        res.status(HttpCode.HTTP_OK).json(usuario);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

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
    const {nombre, email, password, remember_token, id_estado, id_rol} = req.body;

    try {
        const newUser = await db.users.create({ 
            nombre, email, password: bcrypt.hashSync(password, 16), id_estado, id_rol, remember_token
        });
        res.status(HttpCode.HTTP_CREATED).json(newUser);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const {nombre, email, password, perfi, id_estado, rol, remember_token } = req.body;
    try {
        await db.proyecto.update({ 
            nombre, email, password, perfi, id_estado, rol, remember_token
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

exports.updatePassword = async (req, res) => {
    const { id_usuario } = req.query;
    const { password } = req.query;
    try {
        const user = await db.users.update({ password: bcrypt.hashSync(password, 16) },
        { where: { id_usuario: id_usuario } }
        );
        res.status(HttpCode.HTTP_OK).json(user);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }

}

