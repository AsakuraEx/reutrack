const HttpCode = require("../../configs/httpCode");
const db = require("../models");
const moment = require("moment");
const { Op, where, QueryTypes } = require("sequelize");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const imageToBase64 = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Error leyendo imagen: ${filePath}`, err);
        return reject(new Error(`No se pudo leer la imagen en: ${filePath}`));
      }
      const ext = path.extname(filePath).toLowerCase().replace(".", "");
      const base64Image = `data:image/${ext};base64,${data.toString("base64")}`;
      resolve(base64Image);
    });
  });
};

//Obtiene reuniones por id_motivo recibido en un body, retorna todas las reuniones o en su defecto filtradas por id_motivo
exports.motivo = async (req, res) => {
  const id = req.body.id_motivo
  try {
    const whereClause = {};
    if (id) whereClause.id_motivo = id
    
    let include = [
      {
        model: db.ctl_motivos_reunion,
        as: "motivo_reunion",
        atributes: ["nombre"],
      }
    ]

    const reunion = await db.reunion.findAll({
      include,
      where: whereClause,
    })
    if (!reunion) {
      return res
        .status(HttpCode.HTTP_NOT_FOUND)
        .json({ error: "No se han encontrado reuniones" });
    }
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (error) {
    console.error("Error: ", error.message || error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
}

//Obtiene un registro mediante el id recibido en el parametro de la ruta
exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const reunion = await db.reunion.findOne({
      where: { id: id },
      include: [
        {
          as: "motivo",
          model: db.ctl_motivos_reunion,
          atributes: ["id", "nombre"],
        },
      ],
    });
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (err) {
    console.error("Error: ", err.message || err);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

//Obtiene una reunión mediante el codigo de la misma
exports.actual = async (req, res) => {
  try {
    const { codigo } = req.params;
    const reunion = await db.reunion.findOne({
      where: { codigo: codigo },
      include: [
        {
          as: "motivo",
          model: db.ctl_motivos_reunion,
          atributes: ["id", "nombre"],
        },
      ],
    });
    if (!reunion) {
      res
        .status(HttpCode.HTTP_BAD_REQUEST)
        .json({ error: "La reunión no existe" });
    } else if (reunion.id_estado === 3) {
      res
        .status(HttpCode.HTTP_BAD_REQUEST)
        .json({ error: "La reunión ha finalizado" });
    } else if (reunion.id_estado === 2) {
      res
        .status(HttpCode.HTTP_BAD_REQUEST)
        .json({ error: "La reunión se canceló" });
    } else if (reunion.id_estado === 1) {
      res.status(HttpCode.HTTP_OK).json(reunion);
    }
  } catch (err) {
    console.error("Error: ", err.message || err);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

//Obtiene la reunion mas reciente registrada
exports.ultima = async (req, res) => {
  try {
    const reunion = await db.reunion.findOne({
      order: [["id", "desc"]],
      include: [
        {
          as: "motivo",
          model: db.ctl_motivos_reunion,
          atributes: ["id", "nombre"],
        },
      ],
    });

    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (err) {
    console.error("Error: ", err.message || err);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

//Obtiene el detalle de la reunion
exports.detalle = async (req, res) => {
  const id = req.params.id;

  try {
    const whereClause = {};

    whereClause.id = id;

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
        attributes: ["id", "visitante"],
        include: [
          {
            model: db.users,
            as: "usuario",
            attributes: ["nombre", "email"],
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
          "id_version",
          "id_estado",
          "expiracion",
          "codigo",
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
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (error) {
    console.error("Error: ", error.message || error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

//Muestra todas las reuniones
exports.index = async (req, res) => {
  try {
    const { id_version, id_proyecto, id_estado, id_usuario, desde, hasta } =
      req.query;

    const limit = parseInt(req.query.limit) || null;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (id_version) whereClause.id_version = id_version;
    if (id_estado) whereClause.id_estado = id_estado;

    // Filtro por usuario y rol
    if (id_usuario) {
      const usuario = await db.users.findOne({ where: { id: id_usuario } });

      if (!usuario) {
        return res
          .status(HttpCode.HTTP_NOT_FOUND)
          .json({ error: "Usuario no encontrado" });
      }

      if (usuario.id_rol !== 1) {
        const encargados = await db.encargado.findAll({
          where: { id_usuario },
          attributes: ["id_reunion"],
        });

        if (encargados.length > 0) {
          whereClause.id = {
            [Op.in]: encargados.map((encargado) => encargado.id_reunion),
          };
        } else {
          return res
            .status(HttpCode.HTTP_NOT_FOUND)
            .json({ error: "No se encontraron reuniones para este usuario" });
        }
      }
    }

    // Filtro de fechas
    if (desde || hasta) {
      whereClause.createdAt = {};
      if (desde)
        whereClause.createdAt[Op.gte] = moment(desde).startOf("day").toDate();
      if (hasta)
        whereClause.createdAt[Op.lte] = moment(hasta).endOf("day").toDate();
    }

    // Construcción dinámica de includes
    const include = [
      {
        model: db.users,
        as: "user",
        attributes: ["nombre"],
        required: true,
      },
      {
        model: db.version,
        as: "version",
        attributes: ["nombre"],
        required: true,
        include: [],
      },
      {
        model: db.ctl_estado,
        as: "estado",
        attributes: ["nombre"],
        required: true,
      },
      {
        as: "motivo",
        model: db.ctl_motivos_reunion,
        atributes: ["id", "nombre"],
      },
    ];

    // Agregar proyecto solo si se pasa id_proyecto
    if (id_proyecto) {
      include[1].include.push({
        model: db.proyecto,
        as: "proyecto",
        attributes: ["nombre"],
        where: { id: id_proyecto },
      });
    } else {
      include[1].include.push({
        model: db.proyecto,
        as: "proyecto",
        attributes: ["nombre"],
      });
    }

    // Búsqueda en la base de datos
    const { count, rows } = await db.reunion.findAndCountAll({
      attributes: {
        exclude: ["id_usuario", "id_version", "id_estado", "updatedAt"],
      },
      include,
      where: whereClause,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    // Paginación
    const start = offset + 1;
    const end = Math.min(start + rows.length - 1, count);

    return res.status(HttpCode.HTTP_OK).json({
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      start,
      end,
      data: rows,
    });
  } catch (err) {
    console.error("Error:", err.message || err);
    return res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

exports.create = async (req, res) => {
  const {
    nombre,
    lugar,
    codigo,
    virtual,
    motivo,
    fecha_reunion,
    expiracion,
    id_usuario,
    id_estado,
    id_version
  } = req.body;

  const idUsuarioInt = parseInt(id_usuario, 10);

  try {
    const reunion = {
      nombre,
      lugar,
      codigo,
      expiracion,
      id_usuario: idUsuarioInt,
      id_estado,
      id_version,
      id_motivo: motivo,
      virtual,
    };

    if(fecha_reunion) {
      reunion.createdAt = fecha_reunion;
      reunion.id_estado = 8;
    }

    const newReunion = await db.reunion.create(reunion);

    res.status(HttpCode.HTTP_CREATED).json(newReunion);

  } catch (error) {
    console.error("Error", error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

exports.iniciar = async (req, res) => {

  const id_reunion = req.params.id;
  try {
    await db.reunion.update({ id_estado: 1 }, { where: { id: id_reunion } });
    const reunion = await db.reunion.findByPk(id_reunion);
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (error) {
    console.error("Error", error.message || error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

exports.cancelar = async (req, res) => {
  try {
    const {id_reunion, justificacion, id_usuario} = req.body;

    console.log(justificacion)

    await db.reunion.update(
      { 
        id_estado: 2,
        justificacion_cancelar: justificacion,
        usuario_cancela: id_usuario
      }, 
      { 
        where: { id: id_reunion } 
      });
    const reunion = await db.reunion.findByPk(id_reunion);
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (error) {
    console.error("Error", error.message || error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

exports.finalizar = async (req, res) => {
  try {
    const id = req.params.id;
    await db.reunion.update({ id_estado: 3 }, { where: { id: id } });
    const reunion = await db.reunion.findByPk(id);
    res.status(HttpCode.HTTP_OK).json(reunion);
  } catch (error) {
    console.error("Error", error.message || error);
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

// Reprograma una reunión
// Autor: Francisco Escobar
// Fecha: 2026-02-03 hora: 02:10 p.m
exports.reprogramar = async (req, res) => {

  const { id, fecha_reprogramada, id_usuario } = req.body;


  // Valida datos requeridos
  if(!id)  res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El id de la reunión es requerido' })
  if(!fecha_reprogramada) res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'La fecha de reprogramación de la reunión es requerido' })
  if(!id_usuario) res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: 'El id del usuario que reprograma la reunión es requerido' })

    try {
      //Busca la reunión a reprogramar
      const reunion = await db.reunion.findByPk(id);

      if(!reunion) res.status(HttpCode.HTTP_NOT_FOUND).json({error: 'No se encontró la reunión solicitada'});
    
      const fecha_original = reunion.createdAt;

      //Actualizamos la fecha programada original, la nueva fecha, la bandera de reprogramacion y el usuario que reprogramó
      await db.reunion.update({
        fecha_programacion: fecha_original,
        reprogramado: 1,
        usuario_reprograma: id_usuario,
        createdAt: fecha_reprogramada
      },
      {
        where: { id: id }
      });
    
      res.status(HttpCode.HTTP_OK).json({message: 'La reunión se reprogramó con éxito'})
    } catch (e) {
      //Devuelve un error en caso que falle
      res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json('Ocurrio el siguiente error al intentar procesar la solicitud: ' + e)
    }

  
}

// Reactivar una reunión e inserta registro en bitacora de reactivación
// Autor: Francisco Escobar
// Fecha: 2024-01-15 hora: 07:27 a.m
exports.reactivar = async (req, res) => {
  const { id, justificacion, id_usuario } = req.body;

  // Valida que exista el id_reunion y justificacion en el body de la petición
  if (!id) {
    return res
      .status(HttpCode.HTTP_BAD_REQUEST)
      .json({ error: "ID de reunión es requerido" });
  }

  if (!justificacion) {
    return res
      .status(HttpCode.HTTP_BAD_REQUEST)
      .json({ error: "La justificación es requerida" });
  }

  // Valida que la justificación tenga al menos 20 caracteres
  if (justificacion.length < 20) {
    return res
      .status(HttpCode.HTTP_BAD_REQUEST)
      .json({ error: "La justificación debe tener al menos 20 caracteres" });
  }

  try {
    // Actualizar el estado de la reunión a "Iniciado""
    await db.reunion.update(
      { id_estado: 1, reactivado: true },
      { where: { id: id } }
    );

    // Insertar registro en bitácora de reactivación
    // De esta manera se piensa insertar un registro en la bitácora de reactivación
    await db.bitacora_reactivaciones.create({
      id_reunion: id,
      justificacion: justificacion,
      id_usuario: id_usuario,
    });

    // Log de bitacora registrada
    console.warn(
      "El usuario con ID:",
      id_usuario,
      "ha reactivado la reunión con ID:",
      id,
      "con la justificación:",
      justificacion
    );

    // Respuesta exitosa
    res
      .status(HttpCode.HTTP_OK)
      .json({
        message:
          "Reunión reactivada exitosamente y registro de reactivación creado.",
      });
  } catch (error) {
    // Manejo de errores
    res
      .status(HttpCode.HTTP_INTERNAL_SERVER_ERROR)
      .json({
        error: "No fue posible reactivar la reunión: " + error.message || error,
      });
  }
};

// Extrae la data completa sin filtro de las reuniones reactivadas
// Autor: Francisco Escobar
// Fecha: 2025-10-03 hora: 09:55 a.m
exports.verReactivadas = async (req, res) => {
  try {
    console.log("Buscando en la base de datos");
    const reuniones = await db.bitacora_reactivaciones.findAll({
      include: [
        {
          model: db.users,
          as: "usuario",
          attributes: ["nombre"],
          required: true,
        },
        {
          model: db.reunion,
          as: "reunion",
          attributes: ["nombre", "lugar"],
          required: true,
          include: [
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
              model: db.users,
              as: "user",
              attributes: ["nombre"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log("Reuniones encontradas: " + reuniones.length);
    res.status(HttpCode.HTTP_OK).json(reuniones);
  } catch (e) {
    console.log(e);
    res
      .status(HttpCode.HTTP_BAD_REQUEST)
      .json({
        error: "Hubo un problema para procesar las reuniones reactivadas",
      });
  }
};

exports.generatePDF = async (req, res) => {
  const logoPath = path.join(__dirname, "../public/images/logo-minsal.png");
  const logoPath2 = path.join(
    __dirname,
    "../public/images/Logo-reutrack-fondo-blanco.png"
  );
  const logoPath3 = path.join(__dirname, "../public/images/logo-dtic.png");

  formatearTelefono = (telefono) => {
    if (telefono) {
      if (telefono.length > 0 && telefono.length < 9) {
        cadena = telefono.substring(0, 4) + "-" + telefono.substring(4, 8);
        return cadena;
      } else if (telefono.length === 9) {
        return telefono;
      } else {
        return telefono;
      }
    } else {
      return "-";
    }
  };

  formatearDUI = (dui) => {
    if (dui) {
      if (dui.length > 0 && dui.length < 10) {
        cadena = dui.substring(0, 8) + "-" + dui.substring(8, 9);
        return cadena;
      } else if (dui.length === 10) {
        return dui;
      } else {
        return dui;
      }
    } else {
      return "-";
    }
  };

  let base64Logo, base64Logo2, base64Logo3;

  try {
    base64Logo = await imageToBase64(logoPath);
    base64Logo2 = await imageToBase64(logoPath2);
    base64Logo3 = await imageToBase64(logoPath3);

    if (!base64Logo || !base64Logo2 || !base64Logo3) {
      throw new Error("No se pudo convertir uno o más logos a base64");
    }
  } catch (e) {
    console.error("Error convirtiendo imagen a base64:", e.message);
    return res
      .status(500)
      .json({ error: "Error al convertir imagen a base64" });
  }

  try {
    const id = req.body.id;

    const reunion = await db.reunion.findOne({
      where: { id: id },
      include: [
        {
          model: db.encargado,
          as: "encargado de reunion",
          attributes: ["id", "visitante"],
          include: [
            {
              model: db.users,
              as: "usuario",
              attributes: ["nombre", "email", "documento", "telefono"],
            },
          ],
          where: { visitante: false }, // Filtrar solo encargados que no son visitantes
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
          model: db.puntoreunion,
          as: "puntos de reunion",
          attributes: ["nombre"],
        },
        {
          model: db.minutareunion,
          as: "minutadereunion",
          attributes: ["minuta"],
        },
        {
          model: db.acuerdocompromiso,
          as: "acuerdos de reunion",
          attributes: ["nombre"],
        },
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
      ],
    });

    if (!reunion) {
      return res
        .status(HttpCode.HTTP_NOT_FOUND)
        .json({ error: "Reunión no encontrada" });
    }

    const html = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .title {
                    font-size: 20px;
                    text-align: center;
                }
                .section {
                    margin-bottom: 20px;
                    text-align: justify;
                }
                .section h2 {
                    font-size: 14px;
                    text-decoration: underline;
                }
                .asistentes {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 20px 0;
                    table-layout: fixed;
                }
                .asistentes th, .asistentes td {
                    border: 1px solid black;
                    padding: 8px;
                    overflow: hidden;
                    word-wrap: break-word;
                    text-align: left;
                    font-size: 12px;
                    width: 16.66%;
                }
                .asistentes th {
                    background-color: #f0f0f0;
                }
                .puntos-reunion {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .puntos-reunion li {
                    margin-bottom: 10px;
                }
                .table {
                padding-left: 8px;
                padding-right: 8px;
                }
                .page-break {
                    page-break-before: always;
                }
            </style>
        </head>
        <body>
            <main>
                <div class="title">${
                  reunion["version"]["proyecto"]["nombre"]
                } - ${reunion["version"]["nombre"]}</div>
                <div class="section">
                    <h2>
                    <b>Nombre de reunión: </b>${reunion.nombre}
                    <br>Lugar: </b>${reunion.lugar}
                    <br> <b>Fecha:</b> ${moment(reunion.createdAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                    </h2>
                </div>
                <div class="section">
                    <h2>Encargados de la reunión:</h2>
                    <ul class="puntos-reunion">
                        ${
                          reunion["encargado de reunion"] &&
                          reunion["encargado de reunion"].length > 0
                            ? reunion["encargado de reunion"]
                                .map(
                                  (encargado) => `
                        <li>• ${encargado.usuario.nombre}</li>
                        `
                                )
                                .join("")
                            : ""
                        }
                    </ul>
                </div>
                <div class="section">
                    <h2>Puntos de la reunión:</h2>
                    <ul class="puntos-reunion">
                    ${reunion["puntos de reunion"]
                      .map(
                        (punto) => `
                    <li>• ${punto.nombre}</li>
                    `
                      )
                      .join("")}
                    </ul>
                </div>
                <div class="section">
                    <h2>Desarrollo de la reunión:</h2>
                    <p>${reunion["minutadereunion"][0].minuta}</p>
                </div>
                <div class="section">
                    <h2>Acuerdos:</h2>
                    <ul>
                    ${reunion["acuerdos de reunion"]
                      .map(
                        (acuerdo) => `
                    <li>${acuerdo.nombre}</li>
                    `
                      )
                      .join("")}
                    </ul>
                </div>
                <div class="page-break"></div>
                <div class="section">
                    <h2>Listado de asistencia:</h2>
                    <div class= "table">
                    <table class="asistentes">
                        <tr>
                            <th>Participante</th>
                            <th>Institución</th>
                            <th>Doc de identidad</th>
                            <th>Cargo</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                        ${
                          reunion["encargado de reunion"] &&
                          reunion["encargado de reunion"].length > 0
                            ? reunion["encargado de reunion"]
                                .map(
                                  (encargado) => `
                        <tr>
                            <td>${encargado.usuario.nombre}</td>
                            <td>${
                              encargado.usuario.institucion || "DTIC / MINSAL"
                            }</td>
                            <td>${formatearDUI(
                              encargado.usuario.documento
                            )}</td>
                            <td>Técnico Informático</td>
                            <td>${formatearTelefono(
                              encargado.usuario.telefono
                            )}</td>
                            <td>${encargado.usuario.email}</td>
                        </tr>
                        `
                                )
                                .join("")
                            : ""
                        }
                        ${reunion["asistencia reunion"]
                          .map(
                            (asistente) => `

                        <tr>
                            <td>${asistente.participante}</td>
                            <td>${asistente.institucion}</td>
                            <td>${
                              formatearDUI(asistente.doc_identidad) || "-"
                            }</td>
                            <td>${asistente.cargo}</td>
                            <td>${
                              formatearTelefono(asistente.telefono) || "-"
                            }</td>
                            <td>${asistente.correo}</td>
                        </tr>
                        `
                          )
                          .join("")}
                    </table>
                    </div>
                </div>
            </main>
        </body>
    </html>
        `;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage(); // Create a new page instance
    console.log("Nueva página creada");
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "letter",
      margin: {
        top: "96px",
        right: "96px",
        bottom: "96px",
        left: "96px",
      },
      printBackground: true,
      displayHeaderFooter: true,
      pageRanges: "1-999",
      headerTemplate: `
  <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 8px 96px;">
    <img src="${base64Logo}" style="width: 160px;" />
    <img src="${base64Logo3}" style="width: 160px;" />
  </div>
`,
      footerTemplate: `
  <div style="width: 100%; text-align: center; margin-top: 20px; opacity: 0.5;">
    <img src="${base64Logo2}" style="width: 20%; margin: 0 auto;" />
    <div style="display: flex; justify-content:space-between; padding-left: 60px; padding-right: 60px;">
        <span style="font-size: 12px; margin-top: 10px;">Generado por Reutrack el: ${moment()
          .utcOffset(-6)
          .format("DD/MM/YYYY HH:mm")}</span>
        <span style="font-size: 12px; margin-top: 10px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
    </div>
  </div>
`,
    });

    await browser.close();
    const pdfBuffer = Buffer.from(pdf);

    if (res) {
      const safeName = reunion.nombre.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=reunion_${safeName}.pdf`,
        "Content-Length": pdfBuffer.length,
      });
      res.end(pdfBuffer);
    } else {
      return pdfBuffer;
    }
  } catch (error) {
    console.error("Error generando PDF:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR);
    res.json({ error: "Error generando PDF" });
  }
};

exports.emailPDF = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    const asistentes = req.body.asistentes;
    const nombreReunion = req.body.nombre;
    pdf_minuta = await this.generatePDF(req);

    const mailOptions = {
      from: '"Notificación Requerimientos" ' + process.env.MAIL_FROM,
      to: asistentes,
      subject: "Minuta de reunión: " + nombreReunion,
      html: `
                    <div style="text-align: left; font-family: Arial, sans-serif;">
                            <p>Se adjunta el documento correspondiente a la reunión sostenida.</p>
                        </div>
                    </div>
                `,
      attachments: [
        {
          filename: "minuta.pdf",
          content: pdf_minuta,
          contentType: "application/pdf",
        },
      ],
    };
    await transporter.sendMail(mailOptions);
    res
      .status(HttpCode.HTTP_OK)
      .json({ exito: "Se ha enviado un correo electrónico" });
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.reunionPorVersion = async (req, res) => {

try {

    const { id_proyecto, id_estado } = req.query; 

    let querySQL = `
      SELECT 
        p.nombre as proyecto, 
        v.nombre as version, 
        COUNT(r.id) as cantidad_reuniones 
      FROM proyecto p 
      JOIN version v ON p.id = v.id_proyecto 
      JOIN reunion r ON v.id = r.id_version 
    `;

    const replacements = {};

    if (id_proyecto && !id_estado) {
      querySQL += ` WHERE p.id = :id_proyecto `;
      replacements.id_proyecto = id_proyecto;
    }

    if (!id_proyecto && id_estado) {
      querySQL += ` WHERE r.id_estado = :id_estado`;
      replacements.id_estado = id_estado;
    }

    if (id_proyecto && id_estado) {
      querySQL += ` WHERE p.id = :id_proyecto and r.id_estado = :id_estado`;
      replacements.id_proyecto = id_proyecto;
      replacements.id_estado = id_estado;
    }

    querySQL += ` 
      GROUP BY p.id, v.id, p.nombre, v.nombre 
      ORDER BY p.nombre ASC
    `;


    const data = await db.sequelize.query(querySQL, {
      replacements: replacements,
      type: QueryTypes.SELECT
    });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al consultar", error: e.message });
  }

}
