const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const axios = require('axios');

// Obtener todas
exports.getAll = async (req, res) => {
  try {
      const instancias = await db.ctl_instancias_reutrack.findAll();
      return res.status(HttpCode.HTTP_OK).json(instancias);
  } catch (err) {
    return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};


// Obtener una por id
exports.findById = async (req, res) => {

  try {
    const { api_key } = req.params
    const instancia = await db.ctl_instancias_reutrack.findOne({
      where: { id: api_key }
    });

    if(!instancia) {
      return res.status(HttpCode.HTTP_NOT_FOUND).json({ 
        error: 'Instancia no encontrada' 
      });
    }

    return res.status(HttpCode.HTTP_OK).json(instancia);

  } catch (err) {
    return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: err.message });
  }

}

exports.obtenerUsuarios = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const instancia_seleccionada = req.query.host;

    if(!instancia_seleccionada) {
      return res.status(HttpCode.HTTP_BAD_REQUEST).json({error: 'No se ha proporcionado la dirección HTTP a consumir.'})
    }
    
    const url = instancia_seleccionada + '/api/usuarios/usuariosApi';

    const response = await axios.get(url, {
      headers:{
        'x-api-key': API_KEY
      }
    });

    return res.status(200).json(response.data);

  } catch (err) {
    return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'No pudo conectarse a la instancia: ' + err.message });
  }
}

exports.enviarReunion = async (req, res) => {

  const {
    id_reunion,
    host,
    usuario
  } = req.body
  
  try {

    const { frontend_url } = await db.ctl_instancias_reutrack.findOne({
      where: { id: process.env.API_KEY }
    });
    
    const whereClause = {};

    whereClause.id = id_reunion;

    let include = [
      {
        model: db.version,
        as: "version",
        attributes: ["nombre"],
        include: [
          {
            model: db.proyecto,
            as: "proyecto",
            attributes: ["nombre"],
          },
        ],
      },
      {
        model: db.listaasistencia,
        as: "asistencia reunion",
        attributes: [
          "participante",
          "institucion",
          "doc_identidad",
          "cargo",
          "telefono",
          "correo",
        ],
      },
      {
        model: db.encargado,
        as: "encargado de reunion",
        exclude: ["id", "visitante"],
        include: [
          {
            model: db.users,
            as: "usuario",
            attributes: ["nombre"],
          },
        ],
        where: { visitante: false }, // Filtrar solo encargados que no son visitantes
      },
      {
        model: db.puntoreunion,
        as: "puntos de reunion",
        attributes: ["nombre"],
      },
      {
        model: db.minutareunion,
        as: "minutadereunion",
        attributes: ["minuta", "updatedAt"],
      },
      {
        model: db.acuerdocompromiso,
        as: "acuerdos de reunion",
        attributes: ["nombre"],
      },
      {
        model: db.ctl_motivos_reunion,
        as: "motivo",
        atributes: ["id", "nombre"],
      },
    ];

    const reunion = await db.reunion.findOne({
      attributes: {
        exclude: [
          "id_usuario",
          "id_version",,
          "justificacion_cancelar",
          "fecha_programacion",
          "reactivado",
          "usuario_cancela",
          "usuario_reprograma",
          "reprogramado"
        ],
      },
      include,
      where: whereClause,
    });

    if (!reunion) {
      return res
        .status(HttpCode.HTTP_NOT_FOUND)
        .json({ error: "Reunión no encontrada" });
    }

    const data = {
      reunion: {reunion},
      enviado_por: usuario,
      instancia_origen: frontend_url
    }

    console.log(data)

    const url = `${host}/api/instancias_reutrack/recibirReunion`;
    const response = await axios.post(url, data, {
      headers: {
        'x-api-key': process.env.API_KEY
      }
    });

    await db.reunion.update({ reunion_compartida: 1 }, { where: { id: reunion.id } });

    res.status(HttpCode.HTTP_OK).json({
      msj: 'Se ha enviado la reunión exitosamente',
      reunion_creada: response.data
    });

  } catch(err) {
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({error: 'No pudo enviarse la reunión, error: ' + err})
  }



}

exports.guardarReunionCompartida = async (req, res) => {

  try {
    const data = req.body;
    const newReunion = await db.reuniones_recibidas.create(data);
    res.status(HttpCode.HTTP_CREATED).json({
      row:newReunion,
      msg: 'Reunión recibida exitosamente'
    });

  } catch (error) {
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }

}