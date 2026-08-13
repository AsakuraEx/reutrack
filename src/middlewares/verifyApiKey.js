const db = require('../models'); // Ajusta la ruta a tus modelos de Sequelize
const HttpCode  = require('../../configs/httpCode');

const verifyApiKey = async (req, res, next) => {
  try {

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ 
        error: 'Acción no autorizada, no se proporcionó la API KEY' 
      });
    }

    const keyExist = await db.ctl_instancias_reutrack.findOne({
      where: { id: apiKey } // Ajusta el campo correspondiente (ej. id, token, api_key)
    });

    if (!keyExist) {
      return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ 
        error: 'La API KEY proporcionada no es válida' 
      });
    }

    req.instanciaAuth = keyExist;

    next();

  } catch (err) {
    return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ 
      error: 'Error al verificar la autorización: ' + err.message 
    });
  }
};

module.exports = verifyApiKey;