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
    const {minuta, id_reunion, virtual, id_motivo } = req.body;
    try {
        const newMinuta = await db.minutareunion.create({
            minuta,
            id_reunion,
            virtual,
            id_motivo
        });  
        res.status(HttpCode.HTTP_CREATED).json(newMinuta);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const minuta = req.body.minuta; 
        const id_motivo = req.body.id_motivo;
        const isvirtual = req.body.virtual;
        const id_reunion = req.params.id_reunion

        if(id_motivo === null || id_motivo === 0){
            res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El campo motivo de la reunión es obligatorio.' });
            return;
        }
        
        await db.reunion.update({ 
            'id_motivo': id_motivo, 
            'virtual': isvirtual
        }, { where: {id: id_reunion } });

        await db.minutareunion.update({ 'minuta': minuta }, { where: { id_reunion: id_reunion } });        
        const updatedData = await db.minutareunion.findOne(
            { where: { id_reunion: id_reunion } }
        ); 
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
