const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

const table = db.version

exports.index = async (req, res) => {
    try {
        const data = await table.findAll({
            attributes: {exclude: ['id_usuario','id_estado','id_proyecto', 'updatedAt']},
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
                },
                { model: db.proyecto,
                    as: 'proyecto',
                    attributes: ['nombre'],
                    required: true,
                }
            ]
        });
        res.status(HttpCode.HTTP_OK).json(data);
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
        const data = await table.findAll({
            attributes: {exclude: ['id_usuario','id_estado','id_proyecto', 'updatedAt']},
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
                },
                { model: db.proyecto,
                    as: 'proyecto',
                    attributes: ['nombre'],
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
        id_proyecto,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body;

    try {
        const newData = await table.create({ 
            nombre,
            id_proyecto,
            id_usuario,
            id_estado,
            acta_aceptacion
        });
        res.status(HttpCode.HTTP_CREATED).json(newData);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.update = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        id_proyecto,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body
    try {
        await table.update({
            nombre,
            id_proyecto,
            id_usuario,
            id_estado,
            acta_aceptacion
        }, {where: {id: id}});

        const updatedData = await table.findByPk(id)
        
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
        await table.update({ 'id_estado': 2 },{ where: {id: id}});
        const data = await table.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(data);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.finalizar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await table.update({ 'id_estado': 3 },{ where: {id: id}});
        res.status(HttpCode.HTTP_OK).json(data);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}


