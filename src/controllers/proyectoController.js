const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    try {
        const proyecto = await db.proyecto.findAll();
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.byStatus = async (req, res) => {
    try {
        const proyecto = await db.proyecto.findAll({
            where: {
                estado: req.params.estado
            }
        });
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.create = async (req, res) => {
    const {
        nombre,
        version,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body;

    try {
        const newProyecto = await db.proyecto.create({ 
            nombre,
            version,
            id_usuario,
            id_estado,
            acta_aceptacion
        });
        res.status(HttpCode.HTTP_CREATED).json(newProyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
