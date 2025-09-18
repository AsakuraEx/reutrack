const express = require('express');
const router = express.Router();
const acta = require('../controllers/acta_usuarios.controller');

// Para manejar los archivos
const multer = require("multer");
const upload = multer({dest: "C:/Users/frane/Documents/tmp"})


router.get('/documentos', acta.getOneByDocument);
router.get('/all/:id_acta', acta.getAllByActa);
router.get('/:id', acta.getOneByPk);

router.post('/', upload.fields([{name: "documento_identidad", maxCount: 1}, {name: "documento_institucional", maxCount: 1} ]), acta.create);

router.put('/:id', acta.update);

router.delete('/:id', acta.delete);


module.exports = router;
