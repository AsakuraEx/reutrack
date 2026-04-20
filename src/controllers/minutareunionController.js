const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.index = async (req, res) => {
    const id = req.params.id_reunion
    try {
        const minuta = await db.minutareunion.findAll({
            where: { id_reunion: id}
        });

        // Flujo de socket para ver la minuta en tiempo real
        const io = req.app.get('io');
        const nombreSala = "reunion-"+minuta[0].id_reunion;
        io.to(nombreSala).emit('ver-minuta', {
            mensaje: 'Minuta de la reunión',
            data: minuta[0].minuta,
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

        const io = req.app.get('io');
        const nombreSala = "reunion-" + id_reunion;
        if(io) {
            io.to(nombreSala).emit('ver-minuta', {
                mensaje: 'Nueva minuta creada',
                data: minuta[0].minuta,
            });
        }

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
        const nombre_reunion = req.body.nombre_reunion;
        const lugar_reunion = req.body.lugar_reunion;
        const id_reunion = req.params.id_reunion

        if(id_motivo === null || id_motivo === 0){
            res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El campo motivo de la reunión es obligatorio.' });
            return;
        }
        
        await db.reunion.update({ 
            'id_motivo': id_motivo, 
            'virtual': isvirtual,
            'nombre': nombre_reunion,
            'lugar': lugar_reunion
        }, { where: {id: id_reunion } });

        await db.minutareunion.update({ 'minuta': minuta }, { where: { id_reunion: id_reunion } });        
        const updatedData = await db.minutareunion.findOne(
            { where: { id_reunion: id_reunion } }
        ); 

        const io = req.app.get('io');
        const nombreSala = "reunion-" + id_reunion;
        if(io) {
            io.to(nombreSala).emit('ver-minuta', {
                mensaje: 'Minuta actualizada',
                data: minuta,
            });
        }
        
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
