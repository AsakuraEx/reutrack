const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    const id = req.params.id_reunion
    try {
        const encargado = await db.encargado.findAll({
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true,
                },
            ],
            where: { id_reunion: id}
        });
        res.status(HttpCode.HTTP_OK).json(encargado);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const {id_usuario, id_reunion} = req.body;
    try {
        const encargado = await db.encargado.findAll({
            where: { id_usuario: id_usuario, id_reunion: id_reunion }
        })
        if (encargado.length > 0) {
            res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'El usuario ya está asignado'})
        }
        const newEncargado = await db.encargado.create({
            id_usuario,
            id_reunion,
        });
        res.status(HttpCode.HTTP_CREATED).json(newEncargado );
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {id_usuario, id_reunion} = req.body;
        const id = req.params.id;
        await db.encargado.update({id_usuario, id_reunion},{ where: {id: id}});

        const updatedData = await db.encargado.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await db.encargado.destroy({where: {id: id}});
        res.status(HttpCode.HTTP_OK).json({message: 'Encargado eliminado con éxito'})
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}  