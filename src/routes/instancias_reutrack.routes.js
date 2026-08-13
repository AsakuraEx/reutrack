const express = require('express');
const router = express.Router();
const instanciasCtrl = require('../controllers/ctl_instancias_reutrack.controller');
const verifyApiKey = require('../middlewares/verifyApiKey');

router.use(verifyApiKey);

// GET /api/instancias_reutrack
router.get('/', instanciasCtrl.getAll);   // Obtiene todas
// GET usuarios de instancia seleccionada
router.get('/usuarios', instanciasCtrl.obtenerUsuarios);
router.post('/enviarReunion', instanciasCtrl.enviarReunion);
router.post('/recibirReunion', instanciasCtrl.guardarReunionCompartida);

router.get('/:api_key', instanciasCtrl.findById); //Obtiene una



module.exports = router;
