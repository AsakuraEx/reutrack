const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const reunion = await db.reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    try {
        const reunion = await db.reunion.findAll({
            attributes: {exclude: ['id_usuario', 'id_version', 'id_estado', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'user',
                    attributes: ['name'],
                    required: true,
                },
                { model: db.version,
                    as: 'version',
                    attributes: ['nombre'],
                    required: true,

                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['name'],
                    required: true,
                }
            ],   
        });
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.create = async (req, res) => {
    const {
        nombre,
        lugar,
        codigo,
        id_usuario,
        id_estado,
        id_version
    } = req.body;

    try {
        const reunion = await db.reunion.create({
            nombre,
            lugar,
            codigo,
            id_usuario,
            id_version,
            id_estado,
        });
        res.status(HttpCode.HTTP_CREATED).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    } 
}

exports.cancelar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.reunion.update({ 'id_estado': 2 },{ where: {id: id}});
        const reunion = await db.reunion.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}