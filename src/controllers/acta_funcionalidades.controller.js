const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');


// Obtener todas
exports.getAll = async (req, res) => {
  
  const { id_acta } = req.query;

  try {
    const funcionalidades = await db.acta_funcionalidades.findAll({
      where: id_acta ? { id_acta } : {},
      include: [ 
          {
              model: db.acta_aceptacion,
              as: 'acta',
              attributes: ['id', 'acuerdos']
          },
      ] // usa los alias de tus asociaciones
    });
    res.status(HttpCode.HTTP_OK).json(funcionalidades);
  } catch (err) {
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// Obtener una por id
exports.getOne = async (req, res) => {
  try {
    const funcionalidad = await db.acta_funcionalidades.findByPk(req.params.id, {
      include: [
            {
                model: db.acta_aceptacion,
                as: 'acta',
                attributes: ['id', 'acuerdos']
            },
      ]
    });
    if (!funcionalidad) return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'No encontrada' });
    res.json(funcionalidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva
exports.create = async (req, res) => {
  try {
    const nueva = await db.acta_funcionalidades.create(req.body);
    res.status(HttpCode.HTTP_CREATED).json(nueva);
  } catch (err) {
    res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: err.message });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const [updated] = await db.acta_funcionalidades.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: 'No encontrada' });
    const acta = await db.acta_funcionalidades.findByPk(req.params.id);
    res.json(acta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {

    const deletedCount = await db.acta_funcionalidades.destroy({
      where: { id: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Registro no encontrado' });
    }

    res.status(HttpCode.HTTP_OK).json({ message: 'Registro eliminado correctamente' });

  }catch (err) {
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({error: err.message})
  }
}