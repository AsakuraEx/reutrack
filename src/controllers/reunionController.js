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
        const reunion = await db.reunion.findAll();
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
        id_proyecto
    } = req.body;

    // Validation
    if (!nombre || !lugar || !codigo || !id_usuario || !id_estado || !id_proyecto) {
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'All fields are required.' });
    }

    try {
        const reunion = await db.reunion.create({
            nombre,
            lugar,
            codigo,
            id_usuario,
            id_estado,
            id_proyecto
        });
        res.status(HttpCode.HTTP_CREATED).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    } 
}
