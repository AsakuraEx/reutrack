const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    const {id} = req.params
    try {
        const listaAsistencia = await db.listaasistencia.findAll({
            where: {id_reunion: id}
        });
        res.status(HttpCode.HTTP_OK).json(listaAsistencia);
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const {participante, institucion, doc_identidad, cargo, telefono, correo, id_reunion} = req.body;
    try {
        const newListaAsistencia = await db.listaasistencia.create({
            participante: participante.split(' ').map(
                word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            institucion: institucion.toUpperCase(),
            cargo: cargo.split(' ').map(
                word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            doc_identidad,
            telefono,
            correo: correo.toLowerCase(),
            id_reunion,
        });
        res.status(HttpCode.HTTP_CREATED).json(newListaAsistencia);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {participante, doc_identidad, cargo, telefono, correo, id_reunion} = req.body;
        const id = req.params.id;
        await db.listaasistencia.update({
            participante,
            doc_identidad,
            cargo,
            telefono,
            correo, 
            id_reunion
        },{ where: {id: id}});

        const updatedData = await db.listaasistencia.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await db.listaasistencia.destroy({where: {id: id}});
        res.status(HttpCode.HTTP_OK).json({message: 'Participante eliminado con éxito'})
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}  