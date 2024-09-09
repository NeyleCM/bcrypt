const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/users');
const { secret } = require('./crypto/config');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({
  secret: secret,  // Secreto generado de forma segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Usa secure: true en producción (HTTPS)
}));

// Rutas
app.use('/', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});