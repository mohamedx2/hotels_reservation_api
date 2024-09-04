const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  idRestaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etablissement',
    required: true
  },
  numero: {
    type: String,
    required: true,
    trim: true,
  },
  capacite: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;
