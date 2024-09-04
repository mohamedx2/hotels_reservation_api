const Etablissement = require('../models/Etablissement');
const Chambre = require('../models/Chambre');
const Table = require('../models/Table');

const addEtablissement = async (req, res) => {
  const { idProp, nom, email, number, adress } = req.body;
  try {
    const etablissement = new Etablissement({ idProp, nom, email, number, adress });
    await etablissement.save();
    res.status(201).json(etablissement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEtablissements = async (req, res) => {
  try {
    const etablissements = await Etablissement.find().populate('idProp');
    res.status(200).json(etablissements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addChambre = async (req, res) => {
  const { idHotel, numero, type, capacite, prix } = req.body;
  try {
    const chambre = new Chambre({ idHotel, numero, type, capacite, prix });
    await chambre.save();
    res.status(201).json(chambre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTable = async (req, res) => {
  const { idRestaurant, numero, capacite } = req.body;
  try {
    const table = new Table({ idRestaurant, numero, capacite });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEtablissement, getEtablissements, addChambre, addTable };
