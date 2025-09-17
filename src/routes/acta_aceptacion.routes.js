const express = require('express');
const router = express.Router();
const actaCtrl = require('../controllers/acta_aceptacion.controller');

// GET /api/actas
router.get('/', actaCtrl.getAll);

// GET /api/actas/:id
router.get('/:id_version', actaCtrl.getOne);

// POST /api/actas
router.post('/', actaCtrl.create);

// PUT /api/actas/:id
router.put('/:id', actaCtrl.update);

router.get('/actual/:id', actaCtrl.getOnePk);

module.exports = router;
