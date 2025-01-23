const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    const id = req.params.id_reunion
    try {
        const minuta = await db.minutareunion.findAll({
            where: { id_reunion: id}
        });
        res.status(HttpCode.HTTP_OK).json(minuta);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const {minuta, id_reunion} = req.body;
    try {
        const newMinuta = await db.minutareunion.create({
            minuta,
            id_reunion,
        });
        res.status(HttpCode.HTTP_CREATED).json(newMinuta);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {minuta, id_reunion} = req.body;
        const id = req.params.id;
        await db.minutareunion.update({minuta, id_reunion},{ where: {id: id}});

        const updatedData = await db.minutareunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await db.minutareunion.destroy({where: {id: id}});
        res.status(HttpCode.HTTP_OK).json({message: 'Eliminado con éxito'})
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}  