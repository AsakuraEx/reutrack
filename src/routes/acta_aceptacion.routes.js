const express = require('express');
const router = express.Router();
const actaCtrl = require('../controllers/acta_aceptacion.controller');
const { verifyToken } = require('../middlewares/verifyToken');

// GET /api/actas
router.get('/', [verifyToken], actaCtrl.getAll);

// GET /api/actas/:id
router.get('/:id_version', [verifyToken], actaCtrl.getOne);

// POST /api/actas
router.post('/', [verifyToken], actaCtrl.create);

// PUT /api/actas/:id
router.put('/:id', [verifyToken], actaCtrl.finalizar);

router.get('/actual/:id', actaCtrl.getOnePk);

router.get('/pdf/:id', actaCtrl.createPdf);

router.post('/enviarPdf', actaCtrl.emailActa);


module.exports = router;
