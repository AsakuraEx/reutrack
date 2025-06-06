const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');



function imageToBase64(imagePath) {
    return fs.readFileSync(imagePath, { encoding: 'base64' });
}

//Obtiene un registro mediante el id recibido en el parametro de la ruta
exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const reunion = await db.reunion.findOne({
            where: {id: id }
        });
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

//Obtiene una reunión mediante el codigo de la misma
exports.actual = async (req,res) => {
    try {
        const {codigo} = req.params ;
        const reunion = await db.reunion.findOne({
            where: {codigo: codigo }
        });
        if(!reunion){
            res.status(HttpCode.HTTP_OK).json({error: 'La reunión no existe'});
        }
        else if(reunion.id_estado == 3){
            res.status(HttpCode.HTTP_OK).json({error: 'La reunión ha finalizado'});
        }
        else if(reunion.id_estado != 3){
            res.status(HttpCode.HTTP_OK).json(reunion);
        }
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

//Obtiene la reunion mas reciente registrada
exports.ultima = async (req,res) => {
    try {
        const reunion = await db.reunion.findOne({
            order: [['id', 'desc']],
        });
        
        res.status(HttpCode.HTTP_OK).json(reunion);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

//Obtiene el detalle de la reunion
exports.detalle = async (req, res) => {
    const id  = req.params.id;


    try {
        
        const whereClause = {}
        whereClause.id = id;
        let include = [
            {
                model: db.version,
                as: 'version',
                attributes: ['nombre'],
                include: [
                    {
                        model: db.proyecto,
                        as: 'proyecto',
                        attributes: ['nombre']
                    }
                ]
            },
            {
                model: db.listaasistencia,
                as: 'asistencia reunion',
                attributes: ['participante', 'institucion', 'doc_identidad', 'cargo', 'telefono', 'correo'],
            },
            {
                model: db.encargado,
                as: 'encargado de reunion',
                attributes: ['id'],
                include: [
                    {
                        model: db.users,
                        as: 'usuario',
                        attributes: ['nombre']
                    }
                ],
            },
            {
                model: db.puntoreunion,
                as: 'puntos de reunion',
                attributes: ['nombre'],
            },
            {
                model: db.minutareunion,
                as: 'minutadereunion',
                attributes: ['minuta', 'updatedAt'],
            },
            {
                model: db.acuerdocompromiso,
                as: 'acuerdos de reunion',
                attributes: ['nombre'],
            },
            
        ]
        
        const reunion = await db.reunion.findOne({
            attributes: {exclude: ['id_usuario','id_version','id_estado','expiracion', 'codigo']},
            include,
            where: whereClause
        });
        if (!reunion) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Reunión no encontrada' });
        }
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error: ', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

//Muestra todas las reuniones
exports.index = async (req, res) => {
    try {
        const { id_version, id_proyecto, id_estado, id_usuario, desde, hasta } = req.query;

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (id_version) whereClause.id_version = id_version;
        if (id_estado) whereClause.id_estado = id_estado;

        // Filtro por usuario y rol
        if (id_usuario) {
            const usuario = await db.users.findOne({ where: { id: id_usuario } });

            if (!usuario) {
                return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: "Usuario no encontrado" });
            }

            if (usuario.id_rol !== 1) {
                const encargados = await db.encargado.findAll({
                    where: { id_usuario },
                    attributes: ["id_reunion"],
                });

                if (encargados.length > 0) {
                    whereClause.id = { [Op.in]: encargados.map(encargado => encargado.id_reunion) };
                } else {
                    return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: "No se encontraron reuniones para este usuario" });
                }
            }
        }

        // Filtro de fechas
        if (desde || hasta) {
            whereClause.createdAt = {};
            if (desde) whereClause.createdAt[Op.gte] = moment(desde).startOf("day").toDate();
            if (hasta) whereClause.createdAt[Op.lte] = moment(hasta).endOf("day").toDate();
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
            attributes: { exclude: ["id_usuario", "id_version", "id_estado", "updatedAt"] },
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
        return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

exports.create = async (req, res) => {
    const {
        nombre,
        lugar,
        codigo,
        expiracion,
        id_usuario,
        id_estado,
        id_version
    } = req.body;

    const idUsuarioInt = parseInt(id_usuario, 10);
    const expiracionDate = moment(expiracion, 'D/M/YYYY, h:mm:ss a').toDate();
   

    try {
        const reunion = {
            nombre,
            lugar,
            codigo,
            expiracion: expiracionDate,
            id_usuario: idUsuarioInt,
            id_estado,
            id_version,
        };
        
        await db.reunion.create(reunion);
        res.status(HttpCode.HTTP_CREATED).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    } 
}

exports.cancelar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.reunion.update({ 'id_estado': 2 },{ where: {id: id}});
        const reunion = await db.reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.finalizar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.reunion.update({ 'id_estado': 3 },{ where: {id: id}});
        const reunion = await db.reunion.findByPk(id);
        res.status(HttpCode.HTTP_OK).json(reunion);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.generatePDF = async (req, res) => {
    
    const logoPath = path.join(__dirname, '../public/images/logo-minsal.png');
    const logoPath2 = path.join(__dirname, '../public/images/Logo-reutrack-fondo-blanco.png');
    const logoPath3 = path.join(__dirname, '../public/images/logo-dtic.png');
    const base64Logo = imageToBase64(logoPath);
    const base64Logo2 = imageToBase64(logoPath2);
    const base64Logo3 = imageToBase64(logoPath3);

    try {
        const id = req.params.id;
        const reunion = await db.reunion.findOne({
            where: { id: id },
            include: [
                {
                    model: db.encargado,
                    as: 'encargado de reunion',
                    attributes: ['id'],
                    include: [
                        {
                            model: db.users,
                            as: 'usuario',
                            attributes: ['nombre', 'email']
                        }
                    ],
                },
                {
                    model: db.listaasistencia,
                    as: 'asistencia reunion',
                    attributes: ['participante', 'institucion', 'doc_identidad', 'cargo', 'telefono', 'correo'],
                },
                {
                    model: db.puntoreunion,
                    as: 'puntos de reunion',
                    attributes: ['nombre'],
                },
                {
                    model: db.minutareunion,
                    as: 'minutadereunion',
                    attributes: ['minuta'],
                },
                {
                    model: db.acuerdocompromiso,
                    as: 'acuerdos de reunion',
                    attributes: ['nombre'],
                },
                {
                    model: db.version,
                    as: 'version',
                    attributes: ['nombre'],
                    include: [
                        {
                            model: db.proyecto,
                            as: 'proyecto',
                            attributes: ['nombre'],
                        },
                    ]
                }
            ],
        });

        if (!reunion) {
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Reunión no encontrada' });
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
        <div class="title">${reunion['version']['proyecto']['nombre']} - ${reunion['version']['nombre']}</div>
        <div class="section">
            <h2>
            <b>Nombre de reunión: </b>${reunion.nombre}
            <br>Lugar: </b>${reunion.lugar}
            <br> <b>Fecha:</b> ${moment(reunion.expiracion).format('DD/MM/YYYY HH:mm')}
            </h2>
        </div>
        <div class="section">
            <h2>Encargados de la reunión:</h2>
            <ul class="puntos-reunion">
                ${reunion['encargado de reunion'] && reunion['encargado de reunion'].length > 0 ? reunion['encargado de reunion'].map(encargado => `
                <li>• ${encargado.usuario.nombre}</li>
                `).join('') : ''}
            </ul>
        </div>
        <div class="section">
            <h2>Puntos de la reunión:</h2>
            <ul class="puntos-reunion">
            ${reunion['puntos de reunion'].map(punto => `
            <li>• ${punto.nombre}</li>
            `).join('')}
            </ul>
        </div>
        <div class="section">
            <h2>Minuta:</h2>
            <p>${reunion['minutadereunion'][0].minuta}</p>
        </div>
        <div class="section">
            <h2>Acuerdos:</h2>
            <ul>
            ${reunion['acuerdos de reunion'].map(acuerdo => `
            <li>${acuerdo.nombre}</li>
            `).join('')}
            </ul>
        </div>
        <div class="page-break"></div>
        <div class="section">
            <h2>Asistentes:</h2>
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
                ${reunion['encargado de reunion'] && reunion['encargado de reunion'].length > 0 ? reunion['encargado de reunion'].map(encargado => `
                <tr>
                    <td>${encargado.usuario.nombre}</td>
                    <td>${encargado.usuario.institucion || 'DTIC / MINSAL'}</td>
                    <td>-</td>
                    <td>Técnico Informático</td>
                    <td>-</td>
                    <td>${encargado.usuario.email}</td>
                </tr>
                `).join('') : ''}
                ${reunion['asistencia reunion'].map(asistente => `

                <tr>
                    <td>${asistente.participante}</td>
                    <td>${asistente.institucion}</td>
                    <td>${asistente.doc_identidad || '-'}</td>
                    <td>${asistente.cargo}</td>
                    <td>${asistente.telefono || '-'}</td>
                    <td>${asistente.correo}</td>
                </tr>
                `).join('')}
            </table>
            </div>
        </div>
        <div class="section">
            <h2>
            <b>Generado por Reutrack el: </b>${moment().format('DD/MM/YYYY HH:mm')}
            </h2>
        </div>
    </main>
</body>
    </html>
        `
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({
        //executablePath: '/usr/bin/chromium', // o /usr/bin/google-chrome según el caso
        headless: 'new'
        });

          
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({
            format: 'letter',
            margin: {
                top: '96px',
                right: '96px',
                bottom: '96px',
                left: '96px',
            },
            printBackground: true,
            encoding: 'utf8',
            displayHeaderFooter:true,
            headerTemplate: `
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 8px 96px;">
                <img src="data:image/png;base64,${base64Logo}" style="width: 120px; height: 40px;">
                <img src="data:image/png;base64,${base64Logo3}" style="width: 120px; height: 40px;">
            </div>
            `,
            footerTemplate: `
            <div style="width: 100%; text-align: center; margin-top: 20px; opacity: 0.5;">
                <img src="data:image/png;base64,${base64Logo2}" style="width: 40%; margin: 0 auto;">
                <span style="font-size: 12px; margin-top: 10px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
            </div>
            `,
            pageRanges: '1-999'
        });
        
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=reunion_${reunion.nombre}.pdf`);
        res.end(pdf);
    } catch (error) {
        console.error('Error generando PDF:', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Error generando PDF' });
    }
}
