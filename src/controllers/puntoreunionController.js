const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    const id = req.params.id_reunion
    try {
        const puntoreunion = await db.puntoreunion.findAll({
            where: {id_reunion: id}
        })
        res.status(HttpCode.HTTP_OK).json(puntoreunion);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const {nombre, id_reunion} = req.body;
    try {
        const newPuntoReunion = await db.puntoreunion.create({
            nombre,
            id_reunion,
        });
        res.status(HttpCode.HTTP_CREATED).json(newPuntoReunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {nombre, id_reunion} = req.body;
        const id = req.params.id;
        await db.puntoreunion.update({nombre, id_reunion},{ where: {id: id}});

        const updatedData = await db.puntoreunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await db.puntoreunion.destroy({where: {id: id}});
        res.status(HttpCode.HTTP_OK).json({message: 'Punto eliminado con éxito'})
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}  