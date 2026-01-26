const { where } = require('sequelize');
const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');


// Obtener todas
exports.getAll = async (req, res) => {
  try {

    const { id_proyecto, estado } = req.query;

    const actas = await db.acta_aceptacion.findAll({
        where: estado ? {id_estado: Number(estado)} : undefined,
        include: [ 
            {
              model: db.version,
              as: 'version',
              attributes: ['id', 'nombre', 'id_proyecto'],
              // si se manda el query, aplica el filtro, sino lo deja libre
              where: id_proyecto ? { id_proyecto: Number(id_proyecto) } : undefined,
              include: [
                {
                  model: db.proyecto,   // <-- relación de version con proyecto
                  as: 'proyecto',       // usa el alias que definiste en tus asociaciones
                  attributes: ['id', 'nombre']
                }
              ]
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
exports.finalizar = async (req, res) => {
  try {
    const rowsAffected = await db.acta_aceptacion.update(
      { id_estado: 7 },
      { where: { id: req.params.id } }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'No encontrada' });
    }

    res.status(200).json({ message: 'Acta finalizada con éxito' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const imageToBase64 = async (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(`Error leyendo imagen: ${filePath}`, err);
          return reject(new Error(`No se pudo leer la imagen en: ${filePath}`));
        }
        const ext = path.extname(filePath).toLowerCase().replace('.', '');
        const base64Image = `data:image/${ext};base64,${data.toString('base64')}`;
        resolve(base64Image);
      });
    });
  };

exports.createPdf = async (req, res) => {
  
  console.log('generatePDF: función invocada');
  const logoPath = path.join(__dirname, '../public/images/logo-minsal.png');
  const logoPath2 = path.join(__dirname, '../public/images/Logo-reutrack-fondo-blanco.png');
  const logoPath3 = path.join(__dirname, '../public/images/logo-dtic.png');

  console.log("¿Existe logo 1?", fs.existsSync(logoPath));
  console.log("¿Existe logo 2?", fs.existsSync(logoPath2));
  console.log("¿Existe logo 3?", fs.existsSync(logoPath3));
  
  let base64Logo, base64Logo2, base64Logo3;
  
  try {
    console.log('Convirtiendo logo 1');
    base64Logo = await imageToBase64(logoPath);
    console.log('Logo 1 convertido');
  
    console.log('Convirtiendo logo 2');
    base64Logo2 = await imageToBase64(logoPath2);
    console.log('Logo 2 convertido');
  
    console.log('Convirtiendo logo 3');
    base64Logo3 = await imageToBase64(logoPath3);
    console.log('Logo 3 convertido');
  
    if (!base64Logo || !base64Logo2 || !base64Logo3) {
      throw new Error('No se pudo convertir uno o más logos a base64');
    }
  } catch (e) {
    console.error('Error convirtiendo imagen a base64:', e.message);
    return res.status(500).json({ error: 'Error al convertir imagen a base64' });
  }

  try {
    const id = req.params.id;
    const acta = await db.acta_aceptacion.findByPk(req.params.id, {
      include: [
        {
            model: db.version,
            as: 'version',
            attributes: ['id', 'nombre', 'id_proyecto'],
            include: [
              {
                model: db.proyecto,
                as: 'proyecto',
                attributes: ['id', 'nombre']
              }
            ]
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
  
    const funcionalidades = await db.acta_funcionalidades.findAll({
      where: { id_acta: id }
    });

    const usuarios = await db.acta_usuarios.findAll({
      where: {id_acta: id}
    });

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
                    p {
                        font-size: 14px;
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
                      padding-left: 0px;
                      padding-right: 0px;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                </style>
            </head>
            <body>
        <main>
            <div class="title">
              Acta de aceptación  <br> 
              ${acta.version.proyecto.nombre} <br>
              ${acta.version.nombre}</div>
            <div class="section">
                <h2>
                  <b>Fecha de apertura: </b>${acta.createdAt}<br>
                  <b>Aperturado por: </b>${acta.usuario.nombre}<br>
                </h2>
            </div>

            <div class="section">
              <h2>Acuerdos</h2>
              <p>1. Compromiso de aceptación del desarrollo del prototipo presentado, con el fin de garantizar la realización del proyecto</p>
              <p>2. De realizar cambios en el prototipo se establece un mínimo de tiempo agregado por cambio de 1 semana mínimo, dependiendo del tamaño del cambio y si estos afectan el flujo de desarrollo</p>
            </div>

            <div class="section">
              <h2>Funcionalidades de la versión:</h2>
              <table class="asistentes">
                  <tr>
                    <th style="width:50%;">Funcionalidad</th>
                    <th style="width:15%;">Estado de aprobación</th>
                    <th style="width:35%;">Cambio solicitado</th>
                  </tr>
                  ${funcionalidades && funcionalidades.length > 0 ? funcionalidades.map(funcionalidad => `
                  <tr>
                      <td>${ funcionalidad.descripcion }</td>
                      <td>${ funcionalidad.aprobado ? 'Aprobado': 'No aprobado' }</td>
                      <td>${ funcionalidad.cambio_solicitado ? funcionalidad.cambio_solicitado : '' }</td>
                  </tr>
                  `).join('') : ''}
              </table>
            </div>

            <div class="section">
              <h2>
                    Se hace constar que las funcionalidades descritas en este documento han sido revisadas y aceptadas por los usuarios designados, quienes han verificado que cumplen con los requisitos establecidos y funcionan según lo esperado.<br>
                    A continuación, se detallan los usuarios que han participado en la revisión y aceptación de las funcionalidades:
              </h2>
              <div class="table">
                <table class="asistentes">
                    <tr>
                      <th style="width:40%;">Nombre</th>
                      <th style="width:20%;">Institución</th>
                      <th style="width:20%;">Cargo</th>
                      <th style="width:20%;">Documento de Identidad</th>
                    </tr>
                    ${usuarios && usuarios.length > 0 ? usuarios.map(usuario => `
                    <tr>
                        <td>${ usuario.nombre }</td>
                        <td>${ usuario.institucion }</td>
                        <td>${ usuario.cargo }</td>
                        <td>${ usuario.documento }</td>
                    </tr>
                    `).join('') : ''}
                </table>
              </div>
            </div>
        </main>
    </body>
        </html>
            `
            
    console.log('Lanzando navegador...');
           const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', '--disable-setuid-sandbox'
      ],
    });
    
     
    console.log('Navegador lanzado');
            const page = await browser.newPage(); // Create a new page instance
    console.log('Nueva página creada');
            await page.setContent(html, { waitUntil: 'networkidle0' })
            const pdf = await page.pdf({
                format: 'letter',
                margin: {
                    top: '96px',
                    right: '96px',
                    bottom: '96px',
                    left: '96px',
                },
                printBackground: true,
                displayHeaderFooter:true,
                pageRanges: '1-999',
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
            <span style="font-size: 12px; margin-top: 10px;">Generado por Reutrack el: ${moment().utcOffset(-6).format('DD/MM/YYYY HH:mm')}</span>
            <span style="font-size: 12px; margin-top: 10px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
        </div>
      </div>
    `,
    
    
            });
            
            await browser.close();
    
    const safeName = acta.version.nombre.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const pdfBuffer = Buffer.from(pdf);
    
    console.log('pdf es buffer:', Buffer.isBuffer(pdfBuffer));
    console.log('pdf tamaño:', pdfBuffer.length);
    console.log('primeros bytes pdf:', pdfBuffer.slice(0, 4));
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=acta_${safeName}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    res.end(pdfBuffer);
    

  }catch(e) {
    res.status(500).json({ error: e.message})
  }

}