const mongoose = require('mongoose');

const propSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mot_passe: {
    type: String,
    required: true,
  },
});

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop;
