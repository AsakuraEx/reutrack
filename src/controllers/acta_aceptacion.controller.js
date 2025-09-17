const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');


// Obtener todas
exports.getAll = async (req, res) => {
  try {
    const actas = await db.acta_aceptacion.findAll({
        include: [ 
            {
                model: db.version,
                as: 'version',
                attributes: ['id', 'nombre', 'id_proyecto']
            },
            {
                model: db.users,
                as: 'usuario',
                attributes: ['id', 'nombre']
            },
            {
                model: db.ctl_estado,
                as: 'estado',
                attributes: ['id', 'nombre']
            },
        ] // usa los alias de tus asociaciones
    });
    res.status(HttpCode.HTTP_OK).json(actas);
  } catch (err) {
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// Obtener una por id
exports.getOnePk = async (req, res) => {
  try {
    const acta = await db.acta_aceptacion.findByPk(req.params.id, {
      include: [
        {
            model: db.version,
            as: 'version',
            attributes: ['id', 'nombre', 'id_proyecto']
        },
        {
            model: db.users,
            as: 'usuario',
            attributes: ['id', 'nombre']
        },
        {
            model: db.ctl_estado,
            as: 'estado',
            attributes: ['id', 'nombre']
        },
      ]
    });
    if (!acta) return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'No encontrada' });
    res.json(acta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una por id
exports.getOne = async (req, res) => {
  try {
    const acta = await db.acta_aceptacion.findOne({
      where: {
        id_version: req.params.id_version
      },
      include: [
        {
            model: db.version,
            as: 'version',
            attributes: ['id', 'nombre', 'id_proyecto']
        },
        {
            model: db.users,
            as: 'usuario',
            attributes: ['id', 'nombre']
        },
        {
            model: db.ctl_estado,
            as: 'estado',
            attributes: ['id', 'nombre']
        },
      ]
    });
    if (!acta) return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'No encontrada' });
    res.json(acta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva
exports.create = async (req, res) => {
  try {
    const nueva = await db.acta_aceptacion.create(req.body);
    res.status(HttpCode.HTTP_CREATED).json(nueva);
  } catch (err) {
    res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: err.message });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const [updated] = await db.acta_aceptacion.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: 'No encontrada' });
    const acta = await acta_aceptacion.findByPk(req.params.id);
    res.json(acta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};