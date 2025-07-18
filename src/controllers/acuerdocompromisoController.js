const HttpCode  = require('../../configs/httpCode');
const db = require('../models');


// Muestra todos los acuerdos asociados a una reunión
// Autor: Walter Romero
// Fecha: 18/07/2025 hora: 02:43 p.m
exports.index = async (req, res) => {
    const id = req.params.id_reunion
    try {
        const acuerdocompromiso = await db.acuerdocompromiso.findAll({
            where: {id_reunion: id}
        })
        res.status(HttpCode.HTTP_OK).json(acuerdocompromiso);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

// Crea un acuerdo para una reunión
// Autor: Walter Romero
// Fecha: 18/07/2025 hora: 02:43 p.m
exports.create = async (req, res) => {
    const {nombre, id_reunion} = req.body;
    try {
        const newAcuerdoCompromiso = await db.acuerdocompromiso.create({
            nombre,
            id_reunion,
        });
        res.status(HttpCode.HTTP_CREATED).json(newAcuerdoCompromiso);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

// Actualiza un acuerdo para una reunión
// Autor: Walter Romero
// Fecha: 18/07/2025 hora: 02:43 p.m
exports.update = async (req, res) => {
    try {
        const {nombre, id_reunion} = req.body;
        const id = req.params.id;
        await db.acuerdocompromiso.update({nombre, id_reunion},{ where: {id: id}});

        const updatedData = await db.acuerdocompromiso.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

// Elimina acuerdo para una reunión
// Autor: Walter Romero
// Fecha: 18/07/2025 hora: 02:43 p.m
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await db.acuerdocompromiso.destroy({where: {id: id}});
        res.status(HttpCode.HTTP_OK).json({message: 'Acuerdo eliminado con éxito'})
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}  