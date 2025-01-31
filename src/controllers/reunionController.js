const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const moment = require('moment');

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const reunion = await db.reunion.findOne({
            where: {id: id }
        });
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.actual = async (req,res) => {
    try {
        const {codigo} = req.params ;
        const reunion = await db.reunion.findOne({
            where: {codigo: codigo }
        });
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.ultima = async (req,res) => {
    try {
        const reunion = await db.reunion.findOne({
            order: [['id', 'desc']],
        });
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    const {id_proyecto, id_estado, id_usuario, codigo} = req.query;
    try {
        const whereClause = {};
        if (id_proyecto) {
            whereClause.id_proyecto = id_proyecto;
        }
        if (id_estado) {
            whereClause.id_estado = id_estado;
        }
        if (id_usuario) {
            whereClause.id_usuario = id_usuario;
        }

        const reunion = await db.reunion.findAll({
            attributes: {exclude: ['id_usuario', 'id_version', 'id_estado', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'user',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.version,
                    as: 'version',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['nombre'],
                    required: true,
                }
            ],
            order: [['id', 'desc']],
            where: whereClause
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
        expiracion,
        id_usuario,
        id_estado,
        id_version
    } = req.body;

    const idUsuarioInt = parseInt(id_usuario, 10);
    const expiracionDate = moment(expiracion, 'D/M/YYYY, h:mm:ss a').toDate();
   

    try {
        const reunion = {
            nombre,
            lugar,
            codigo,
            expiracion: expiracionDate,
            id_usuario: idUsuarioInt,
            id_estado,
            id_version,
        };
        
        await db.reunion.create(reunion);
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
        const reunion = await db.reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.finalizar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.reunion.update({ 'id_estado': 3 },{ where: {id: id}});
        const reunion = await db.reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
