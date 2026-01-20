const { Op } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');

exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const estado = await db.ctl_estado.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(estado);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
  const { tipo } = req.body;
  try {
    const where = tipo === "version"
    ? { id: { [Op.between]: [11, 21] } }
    : { id: { [Op.notBetween]: [11, 21] } }; //cambiar los ID por los que se tengan en base

    const estado = await db.ctl_estado.findAll({ where });
    res.status(HttpCode.HTTP_OK).json(estado);
  } catch (err) {
    console.error("Error", err.message || err);
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

exports.create = async (req, res) => {
    const {nombre, status} = req.body;
    try {
        const newEstado = await db.ctl_estado.create({
            nombre,
            status
        });
        res.status(HttpCode.HTTP_CREATED).json(newEstado);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const {nombre, status} = req.body;
        const id = req.params.id;
        await db.ctl_estado.update({nombre, status},{ where: {id: id}});

        const updatedData = await db.ctl_estado.findByPk(id);

        res.status(HttpCode.HTTP_OK).json(updatedData)
    } catch (err) {
        console.error('Error', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}