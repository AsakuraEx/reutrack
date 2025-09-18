const express = require('express');
const router = express.Router();
const acta = require('../controllers/acta_funcionalidades.controller');

router.get('/', acta.getAll);

router.get('/:id', acta.getOne);

router.post('/', acta.create);

router.put('/:id', acta.update);

router.delete('/:id', acta.delete);

module.exports = router;
