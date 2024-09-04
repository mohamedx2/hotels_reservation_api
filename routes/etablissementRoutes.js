const express = require('express');
const { addEtablissement, getEtablissements, addChambre, addTable } = require('../controllers/etablissementController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addEtablissement);
router.get('/', getEtablissements);
router.post('/chambre', authMiddleware, addChambre);
router.post('/table', authMiddleware, addTable);

module.exports = router;
