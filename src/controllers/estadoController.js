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
    const {name, status} = req.body;
    try {
        const newEstado = await db.ctl_estado.create({
            name,
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
        const {name, status} = req.body;
        const id = req.params.id;
        await db.ctl_estado.update({name, status},{ where: {id: id}});

        const updatedEstado = await db.ctl_estado.findByPk(id);

        res.status(HttpCode.HTTP_OK).json(updatedEstado)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.disable = async (req, res) => {
    try {
        const id = req.params.id
        await Estado.update({ status: 0},{ where: {id: id}})
        const updatedEstado = await Estado.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(updatedEstado)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.enable = async (req, res) => {
    try {
        const id = req.params.id
        await Estado.update({status: 1},{ where: {id: id}})
        const updatedEstado = await Estado.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(updatedEstado)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Internal server error' });
    }
}