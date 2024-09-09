const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');

// Genera un token JWT cuando el usuario inicia sesión correctamente.
const generarToken = (user) => {
  return jwt.sign({ userId: user.id }, hashedSecret, { expiresIn: '1h' });
};

//Verifica que el token proporcionado sea válido. 
//Si no lo es, no permite el acceso a rutas protegidas.
const verificarToken = (req, res, next) => {
  const token = req.session.token;  // El token se almacena en la sesión
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, hashedSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.userId = decoded.userId;  // Decodificar el token para obtener el ID del usuario
    next();
  });
};

module.exports = {
  generarToken,
  verificarToken
};