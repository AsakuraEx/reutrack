const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    try {
        const proyecto = await db.proyecto.findAll({
            attributes: {exclude: ['id_usuario','id_estado', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['name'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['name'],
                    required: true,
                }
            ]
        });
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.byStatus = async (req, res) => {
    const estado = req.params.id
    if (!estado) {
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Estado parameter is required' });
    }
    try {
        const proyecto = await db.proyecto.findAll({
            attributes: {exclude: ['id_usuario','id_estado', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['name'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['name'],
                    required: true,
                }
            ],
            where: {
                id_estado: estado 
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
exports.update = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        version,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body
    try {
        await db.proyecto.update({
            nombre,
            version,
            id_usuario,
            id_estado,
            acta_aceptacion
        }, {where: {id: id}});

        const updatedData = await db.proyecto.findByPk(id)
        
        if (!updatedData){
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Proyecto not found'})
        }
        res.status(HttpCode.HTTP_OK).json(updatedData);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.cancelar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.proyecto.update({ 'id_estado': 2 },{ where: {id: id}});
        const proyecto = await db.proyecto.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.finalizar = async (req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await db.proyecto.update({ estado: 3 },{ where: {id: id}});
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}


