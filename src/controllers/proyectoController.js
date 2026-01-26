const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

const table = db.proyecto

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const proyecto = await db.proyecto.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(proyecto);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    const limit = parseInt(req.query.limit) || null;
    const page = parseInt(req.query.page) || 1;
    const { estado } = req.query;

    try {
        // 1. CORRECCIÓN: Esto no es "options", es la configuración de "attributes"
        // Aquí definimos qué columnas traer (incluyendo el conteo extra)
        const attributes = {
            include: [
                [
                    db.sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM version AS v 
                        WHERE v.id_proyecto = proyecto.id and v.id_estado = 1
                    )`),
                    'cantidad_versiones'
                ]
            ],
            exclude: ['id_usuario', 'updatedAt'],
        };

        // 2. Definimos los JOINs (tablas relacionadas)
        const include = [
            {
                model: db.users,
                as: 'usuario',
                attributes: ['nombre'],
                required: true,
            },
        ];

        // Objeto de configuración principal para la consulta
        const queryOptions = {
            attributes, // <--- Aquí pasamos los atributos definidos arriba
            include,    // <--- Aquí pasamos los includes definidos arriba
            limit: limit,
            offset: (page - 1) * limit,
            order: [['id', 'DESC']],
        };

        // 3. Lógica del filtro (Corrección de sintaxis)
        if (estado) {
            queryOptions.distinct = true;
            queryOptions.col = 'id';
            
            // Agregamos el filtro al array de includes existente
            queryOptions.include.push({
                model: db.version,
                as: 'version',
                attributes: ['id'],
                required: true,
                where: { id_estado: estado }
            });
        }

        // 4. Ejecutamos la consulta pasando el objeto queryOptions limpio
        const { count, rows } = await table.findAndCountAll(queryOptions);

        const start = (page - 1) * limit + 1;
        const end = Math.min(start + rows.length - 1, count);

        res.status(HttpCode.HTTP_OK).json({
            totalRecords: count,
            totalPages: limit ? Math.ceil(count / limit) : 1,
            currentPage: page,
            start: start,
            end: end,
            data: rows,
        });

    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.eliminados = async (req, res) => {

    try {

        const proyectos = await db.bitacora_proyecto_eliminacion.findAll({
            include: [
                {
                    model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true
                }
            ]
        })
    
        res.status(HttpCode.HTTP_OK).json(proyectos);
    
    } catch(e) {
        res.status(HttpCode.HTTP_BAD_REQUEST).json({error: 'ocurrio un error'})
    }

}

exports.indexWithVersion = async (req, res) => {
    const limit = parseInt(req.query.limit) || null
    const page = parseInt(req.query.page) || 1
    
    try {
        
        const options = {
            attributes: {
                exclude: ['id_estado', 'updatedAt'],
            }, 
        }
        const include = [
                { 
                    model: db.users,
                    as: 'usuario',
                    attributes: ['nombre'],
                    required: true,
                },    
                {
                    model: db.version,
                    as: 'version',
                    attributes: ['id'],
                }, 
        ]

        const {count, rows} = await table.findAndCountAll({
            options,
            include,
            distinct: true,
            col: 'id',
            limit: limit,
            offset: (page - 1) * limit,
            order: [['id', 'DESC']],
            
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

exports.byStatus = async (req, res) => {
    const estado = req.params.id
    if (!estado) {
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'Estado parameter is required' });
    }
    try {
        const proyecto = await table.findAll({
            attributes: {exclude: ['id_usuario','id_estado', 'updatedAt']},
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
        id_usuario,
        acta_aceptacion
    } = req.body;

    try {
        const newProyecto = await table.create({ 
            nombre,
            id_usuario,
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
        nombre
    } = req.body
    try {
        await table.update({
            nombre
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
        const proyecto = await table.findByPk(id)
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
exports.finalizar = async (req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await table.update({ estado: 3 },{ where: {id: id}});
        res.status(HttpCode.HTTP_OK).json(proyecto);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

// Elimina un proyecto que no contenga versiones
// Autor: Walter Romero
// Fecha: 2025-07-08 hora: 09:51a.m
exports.delete = async (req, res) => {
    const {id, nombre_proyecto, id_usuario} = req.body;
     // Valida que exista el id_proyecto body de la petición
    if(!id) {
        return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'ID de proyecto es requerido' });
    }
    if(!id_usuario) {
        
        return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'ID de usuario es requerido' });
    }

    try {
        const proyecto = await db.proyecto.findByPk(id);
        const versiones = await db.version.count({
            where: {id_proyecto: id}
        })
        if(versiones == 0){
            
            await db.bitacora_proyecto_eliminacion.create({
                id_proyecto: id,
                nombre_proyecto: nombre_proyecto,
                id_usuario: id_usuario
            })
            await db.proyecto.destroy({where: {id:id}})
            return res.status(HttpCode.HTTP_OK).json("Registro eliminado con exito")
            
        }
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El proyecto no puede eliminarse porque ya cuenta con versiones creadas' })
    } catch (error) {
        console.error('Error', error.message || error)
        return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({error: 'Internal server error'})
    }
}

exports.fusion = async (req, res) => {
    const {id_proyecto_a, id_proyecto_b, id_usuario} = req.body

    if(id_proyecto_a == id_proyecto_b){
        return res.status(HttpCode.HTTP_BAD_REQUEST).json({ error:'Los proyectos eliminados no pueden ser iguales'})
    }
    try {
        await db.version.update(
            {id_proyecto: id_proyecto_a},
            {where: {id_proyecto: id_proyecto_b}}
        )
        await db.bitacora_proyecto_fusion.create({
            id_proyecto_a: id_proyecto_a,
            id_proyecto_b: id_proyecto_b,
            id_usuario: id_usuario
        })
        return res.status(HttpCode.HTTP_OK).json("Fusión de proyectos realizada")
    } catch (error) {
        console.error('Error', error.message || error)
        return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({error: 'Internal server error'})
    }
}