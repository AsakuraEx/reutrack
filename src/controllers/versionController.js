const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

const table = db.version

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const version = await db.version.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(version);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    const {id_proyecto, id_estado} = req.query
    const limit = parseInt(req.query.limit) || null
    const page = parseInt(req.query.page) || 1 
    try {
        const whereClause = {};
        if (id_proyecto) {
            whereClause.id_proyecto = id_proyecto;
        }
        if (id_estado) {
            whereClause.id_estado = id_estado;
        }

        const {count, rows} = await table.findAndCountAll({
            attributes: {exclude: ['id_usuario','id_estado','id_proyecto', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.proyecto,
                    as: 'proyecto',
                    attributes: ['nombre'],
                    required: true,
                }
            ],
            limit: limit,
            offset: (page - 1) * limit,
            order: [['id', 'DESC']],
            where: whereClause
        });

        const start = (page - 1) * limit + 1;
        const end = Math.min(start + rows.length - 1, count);

        res.status(HttpCode.HTTP_OK).json({
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            start: start,
            end: end,
            data: rows,
        });
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.byProject = async (req, res) => {
    let { proyecto, id_estado } = req.params

    if (!proyecto) {
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Estado parameter is required' });
    }
    try {
        let data = await table.findAll({
            attributes: {exclude: ['id_usuario','id_estado','id_proyecto', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.proyecto,
                    as: 'proyecto',
                    attributes: ['nombre'],
                    required: true,
                }
            ],
            where: {
                id_proyecto: Number(proyecto.id),
                ...(id_estado && { id_estado: id_estado })

            }
        });
        res.status(HttpCode.HTTP_OK).json(data);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.create = async (req, res) => {
    const {
        nombre,
        descripcion,
        id_proyecto,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body;

    try {
        const newData = await table.create({ 
            nombre,
            descripcion,
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
        descripcion,
        id_proyecto,
        id_usuario,
        id_estado,
        acta_aceptacion
    } = req.body
    try {
        await table.update({
            nombre,
            descripcion,
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
        let id = req.params.id;
        let {acta_aceptacion} = req.body
        let data = await table.update({ 
            'id_estado': 3,
            'acta_aceptacion': acta_aceptacion
        },
        { where: {id: id}});
        res.status(HttpCode.HTTP_OK).json(data);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.getIniciado = async (req, res) => {
    const {id_proyecto, id_estado} = req.query
    try {
        if (!id_proyecto && !id_estado) {
            return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Both proyecto and estado parameters are required' });
        }
        
        const whereClause = {};
        if (id_proyecto) {
            whereClause.id_proyecto = id_proyecto;
        }
        if (id_estado) {
            whereClause.id_estado = id_estado;
        }

        const data = await table.findAll({
            attributes: {exclude: ['id_usuario','id_estado','id_proyecto', 'updatedAt']},
            include: [
                { model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.ctl_estado,
                    as: 'estado',
                    attributes: ['nombre'],
                    required: true,
                },
                { model: db.proyecto,
                    as: 'proyecto',
                    attributes: ['nombre'],
                    required: true,
                }
            ],
            where: whereClause
        });
        if (data.length === 0) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'No versions found for the given parameters' });
        }
        
        res.status(HttpCode.HTTP_OK).json(data);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
