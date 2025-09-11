const HttpCode  = require('../../configs/httpCode');
const db = require('../models');
const bcrypt = require('bcrypt')

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
    const {nombre, email, password} = req.body;

    try {
        const newUser = await db.users.create({ 
            nombre,
            email,
            password: bcrypt.hashSync(password, 12),
            id_estado: 4,
            id_rol: 2,
            first_session: 1
        });
        res.status(HttpCode.HTTP_CREATED).json(newUser);
    } catch (error) {
        console.error('Error', error.message || error);
        res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const {nombre, email, password} = req.body;
    
    try {
        if(password){
            await db.users.update({ 
                nombre,
                email,
                password: bcrypt.hashSync(password, 12),
                first_session: 1
            }, {where: {id: id}});
        }
        await db.users.update({ 
            nombre,
            email,
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
    
    const oldPassword = await db.users.findByPk(id_usuario); 
    try {
        if (!bcrypt.compareSync(oldpassword, oldPassword.password)) {
            return res.status(HttpCode.HTTP_OK).json('Las contraseñas no coinciden')}
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
