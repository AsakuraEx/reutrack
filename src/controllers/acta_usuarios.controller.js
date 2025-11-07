const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Obtener todas
exports.getAllByActa = async (req, res) => {
  
  const { id_acta } = req.params;

  try {
    const usuarios = await db.acta_usuarios.findAll({
      where: id_acta ? { id_acta } : {},
      include: [ 
          {
              model: db.acta_aceptacion,
              as: 'acta',
              attributes: ['id', 'acuerdos']
          },
      ] // usa los alias de tus asociaciones
    });
    res.status(HttpCode.HTTP_OK).json(usuarios);
  } catch (err) {
    res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// Obtener una por id
exports.getOneByPk = async (req, res) => {
  try {
    const usuarios = await db.acta_usuarios.findByPk(req.params.id, {
      include: [
            {
                model: db.acta_aceptacion,
                as: 'acta',
                attributes: ['id', 'acuerdos']
            },
      ]
    });
    if (!usuarios) return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'No se encontró el usuario' });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una por documento
exports.getOneByDocument = async (req, res) => {
  const { documento } = req.body;
  try {
    const usuarios = await db.acta_usuarios.findOne({
      where: { documento: documento },
      include: [
            {
                model: db.acta_aceptacion,
                as: 'acta',
                attributes: ['id', 'acuerdos']
            },
      ]
    });
    if (!usuarios) return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'No posee documentos' });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva
exports.create = async (req, res) => {
  try {

    console.log(req.files)

    const { documento } = req.body

    //Crea el directorio donde se almacenara
    const outputDir = path.join(__dirname, `../uploads/documentos/${documento}`);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });


    // Esta funcion convierte el archivo a webp y retorna la ruta donde se guarda
    const processImage = async (file, nombre) => {
      const fileName = Date.now()+ '-' + nombre + ".webp";
      const outputPath = path.join(outputDir, fileName);

      await sharp(file.path)
        .resize(800)
        .webp({ quality: 80 })
        .toFile(outputPath);

      //fs.unlinkSync(file.path); // eliminar archivo temporal
      return `/documentos/${documento}/${fileName}`;
    };

    // Variables que almacenan el retorno de la funcion anterior
    let identidadUrl = null;
    let institucionUrl = null;


    if(req.files?.documento_identidad) identidadUrl = await processImage(req.files.documento_identidad[0], 'documento_identidad');
    if(req.files?.documento_institucional) institucionUrl = await processImage(req.files.documento_institucional[0], 'documento_institucional');

    // Se crea el usuario
    const nueva = await db.acta_usuarios.create({
      ...req.body,
      documento_identidad: identidadUrl,
      documento_institucional: institucionUrl
    });

    res.status(HttpCode.HTTP_CREATED).json(nueva);
  } catch (err) {
    res.status(HttpCode.HTTP_BAD_REQUEST).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  
  const row = req.body
  console.log(row)
  try {

    if(row.documento) {
      const filePath = path.join(__dirname, '../uploads', row.documento_identidad);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Archivo eliminado: ${filePath}`);
      } else {
        console.log('El archivo no pudo eliminarse');
      }

      const filePath2 = path.join(__dirname, '../uploads', row.documento_institucional);
      if (fs.existsSync(filePath2)) {
        fs.unlinkSync(filePath2);
        console.log(`Archivo eliminado: ${filePath2}`);
      } else {
        console.log('El archivo no pudo eliminarse');
      }
    }

    await db.acta_usuarios.destroy({
      where: { id: row.id }
    })
    res.status(200).json({ message: 'Eliminado correctamente'})
  }catch (err) {
    res.status(404).json({ error: err.message})
  }
};
