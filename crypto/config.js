// Se usa crypto para generar un secreto aleatorio y bcrypt para encriptarlo.
//Esto asegura que el secreto de sesión sea seguro

const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Generar un secreto aleatorio de 64 bytes y encriptarlo con bcrypt
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10); //El hashedSecret será utilizado para firmar los tokens JWT y asegurar la sesión.

module.exports = {
  secret,
  hashedSecret
};

