const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

//Obtiene un registro mediante el id recibido en el parametro de la ruta
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

//Obtiene una reunión mediante el codigo de la misma
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

//Obtiene la reunion mas reciente registrada
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

//Muestra todas las reuniones
exports.index = async (req, res) => {
    const {id_version, id_estado, id_usuario} = req.query;
    try {
        const whereClause = {};
        if (id_version) {
            whereClause.id_version = id_version;
        }
        if (id_estado) {
            whereClause.id_estado = id_estado;
        }
        if (id_usuario) {
            const usuario = await db.users.findOne({
                where: {id: id_usuario}
            })
            if(usuario.id_rol !== 1){
                const encargados = await db.encargado.findAll({
                    where: {id_usuario: id_usuario},
                    attributes: ['id_reunion']
                })
                if(encargados.length > 0){
                    whereClause.id = {
                        [Op.in]: encargados.map(encargado => encargado.id_reunion)
                    }
                } else {
                    return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'No se encontraron reuniones para este usuario' });
                }
            }
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
                },
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
