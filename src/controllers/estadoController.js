const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const estado = await db.ctl_estado.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(estado);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    try {
        const estado = await db.ctl_estado.findAll();
        res.status(HttpCode.HTTP_OK).json(estado);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const {nombre, status} = req.body;
    try {
        const newEstado = await db.ctl_estado.create({
            nombre,
            status
        });
        res.status(HttpCode.HTTP_CREATED).json(newEstado);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {nombre, status} = req.body;
        const id = req.params.id;
        await db.ctl_estado.update({nombre, status},{ where: {id: id}});

        const updatedData = await db.ctl_estado.findByPk(id);

        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}