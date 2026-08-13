const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); 
const path = require('path');


exports.getOne = async (req,res) => {
    try {
        const id = req.params.id;
        const usuario = await db.users.findOne({
            where: {id: id }
        });
        res.status(HttpCode.HTTP_OK).json(usuario);        
    } catch (err) {
        console.error('Error: ', err.message || err);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });    
    }
}

exports.index = async (req, res) => {
    const limit = parseInt(req.query.limit) || null
    const page = parseInt(req.query.page) || 1
    
    try {
        const { count, rows } = await db.users.findAndCountAll({
            attributes: {
                exclude: ['password', 'first_session', 'remember_token']
            },
            include: [
                {
                    model: db.ctl_cargos,
                    as: 'cargo'
                }
            ],
            limit: limit,
            offset: (page - 1) * limit,
            order: [
                ['id_rol', 'DESC'],
                ['createdAt', 'DESC']
            ],
        });

        const start = (page - 1) * limit + 1;
        const end = Math.min(start + rows.length - 1, count);

        res.status(200).json({
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            start: start,
            end: end,
            data: rows,
        });

    } catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.create = async (req, res) => {
    
    //Variable utilizada para el envio de correos
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER, 
            pass: process.env.MAIL_PASS,
        }
    });

    const {nombre, email, password, telefono, documento, cargo} = req.body;

    const newPassword = password;

    try {
        const newUser = await db.users.create({ 
            nombre,
            email,
            telefono,
            documento,
            password: bcrypt.hashSync(newPassword, 12),
            id_estado: 4,
            id_rol: 2,
            id_cargo: cargo,
            first_session: 1
        });

        const mailOptions = {
                    from: '"Notificación Requerimientos" '+ process.env.MAIL_FROM,
                    to: newUser.email,
                    subject: 'REUTRACK - Usuario creado',
                    html: `
                        <div style="text-align: center; font-family: Arial, sans-serif;">
                            <div style="background-color: #f9f9f9; border-radius: 10px">
                                <img src="cid:logo_reutrack" style="width: 300px;">
                            </div>    
                            <div style="background-color: #F6EDFF; border-radius: 10px; margin-top: 12px; padding-top:8px; padding-bottom: 8px">
                                <h2>Se ha creado su cuenta asociada a su correo, su contraseña temporal es la siguiente:</h2>
                                <center>
                                    <div style="width: 6.5rem;">
                                        <p style="font-size: 24px; font-weight: bold; color: #A855F7; border: 2px solid #A855F7; ">${password}</p>
                                    </div>
                                </center>
                                
                                <p>Inicie sesión con su contraseña temporal en el sitio web.</p>
                            </div>
                        </div>
                    `,
                    attachments: [
                        {
                            filename: 'Logo-reutrack-fondo-blanco.png',
                            path: path.join(__dirname, '../public/images/Logo-reutrack-fondo-blanco.png'), 
                            cid: 'logo_reutrack'
                        }
                    ]
                };
        await transporter.sendMail(mailOptions);

        res.status(HttpCode.HTTP_CREATED).json(newUser);
    } catch (error) {
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const {nombre, email, password, telefono, documento, cargo} = req.body;
    
    console.log('creando usuario...')
    console.log(req.body)

    try {
        if(password){
            await db.users.update({ 
                nombre,
                email,
                telefono,
                documento,
                id_cargo: cargo,
                password: bcrypt.hashSync(password, 12),
                first_session: 1
            }, {where: {id: id}});
        }
        await db.users.update({ 
            nombre,
            email,
            telefono,
            documento,
            id_cargo: cargo
        }, {where: {id: id}});

        const updatedData = await db.users.findByPk(id)
        
        if (!updatedData){
            return res.status(HttpCode.HTTP_NOT_FOUND).json({ error: 'Register not found'})
        }
        res.status(HttpCode.HTTP_OK).json(updatedData);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.updatePassword = async (req, res) => {
    const { id_usuario, password, oldpassword, first_session } = req.body;
    
    // Flujo de recuperacion de contraseña
    if(oldpassword==='temporal') {

        try {
            if(first_session == 1){
                await db.users.update({ first_session: 2 },
                { where: { id: id_usuario } }
            )}
            await db.users.update({ password: bcrypt.hashSync(password, 12) },
            { where: { id: id_usuario }});
            res.status(HttpCode.HTTP_OK).json({exito: 'Contraseña actualizada con exito'});
            return
        }catch (error) {
            console.error('Error', error.message || error);
            res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json('Internal server error');
        }

    }

    // Flujo de cambio de contraseña común
    const oldPassword = await db.users.findByPk(id_usuario); 
    try {
        if (!bcrypt.compareSync(oldpassword, oldPassword.password)) {
            return res.status(HttpCode.HTTP_BAD_REQUEST).json('Las contraseñas no coinciden')}
        if(first_session == 1){
            await db.users.update({ first_session: 2 },
            { where: { id: id_usuario } }
        )}
        await db.users.update({ password: bcrypt.hashSync(password, 12) },
        { where: { id: id_usuario }});
        res.status(HttpCode.HTTP_OK).json(null);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json('Internal server error');
    }

}

exports.status = async (req, res) => {
    const {id_estado, id} = req.body
    try {
        await db.users.update({'id_estado': id_estado}, {where: {id: id}})
        res.status(HttpCode.HTTP_OK).json('Estado actualizado con exito');
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.findCargos = async (req, res) => {

    try {
        const cargos = await db.ctl_cargos.findAll({
            where: { activo: 1 }
        });
        res.status(HttpCode.HTTP_OK).json(cargos);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }

}

exports.indexApi = async (req, res) => {
    const limit = parseInt(req.query.limit) || null
    const page = parseInt(req.query.page) || 1
    
    try {
        const { count, rows } = await db.users.findAndCountAll({
            attributes: {
                exclude: ['password', 'first_session', 'remember_token', 'email', 'telefono', 'documento', 'id_estado', 'id_cargo', 'two_factor_secret', 'createdAt', 'updatedAt']
            },
            limit: limit,
            offset: (page - 1) * limit,
            order: [
                ['id_rol', 'DESC'],
                ['createdAt', 'DESC']
            ],
            where: {
                id_rol: 2
            }
        });

        const start = (page - 1) * limit + 1;
        const end = Math.min(start + rows.length - 1, count);

        res.status(200).json({
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            start: start,
            end: end,
            data: rows,
        });

    } catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
};