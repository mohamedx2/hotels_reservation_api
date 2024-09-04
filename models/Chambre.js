const mongoose = require('mongoose');

const ChambreSchema = new mongoose.Schema({
  idHotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etablissement',
    required: true
  },
  numero: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  capacite: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Chambre = mongoose.model('Chambre', ChambreSchema);

module.exports = Chambre;
