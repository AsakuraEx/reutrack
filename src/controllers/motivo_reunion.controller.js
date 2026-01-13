const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const motivo = await db.ctl_motivos_reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(motivo);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    try {
        const motivo = await db.ctl_motivos_reunion.findAll({
            attributes: ['id', 'nombre']
        });
        res.status(HttpCode.HTTP_OK).json(motivo);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
