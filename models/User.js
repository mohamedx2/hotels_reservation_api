const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  id:mongoose.mongoose.Schema.ObjectId,
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  mot_passe: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin', 'proprietaire'], default: 'client' }
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('mot_passe')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.mot_passe, salt);
    this.mot_passe = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.mot_passe);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
