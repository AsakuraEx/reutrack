const express = require('express');
const router = express.Router();
const instanciasCtrl = require('../controllers/ctl_instancias_reutrack.controller');
const verifyApiKey = require('../middlewares/verifyApiKey');
const {verifyToken} = require('../middlewares/verifyToken');
//router.use(verifyApiKey);

// GET /api/instancias_reutrack
router.get('/', [verifyToken], instanciasCtrl.getAll);

// GET usuarios de instancia seleccionada
router.get('/usuarios', [verifyApiKey], instanciasCtrl.obtenerUsuarios);
router.post('/enviarReunion', [verifyToken], instanciasCtrl.enviarReunion);
router.post('/recibirReunion', [verifyApiKey], instanciasCtrl.guardarReunionCompartida);

router.get('/:api_key', [verifyApiKey], instanciasCtrl.findById); //Obtiene una



module.exports = router;

