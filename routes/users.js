const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { generarToken, verificarToken } = require('../middlewares/authMiddleware');

// Página de inicio de sesión, se muestra un formulario de login.
//Si ya está autenticado, muestra un enlace al panel de control (dashboard) y el botón de logout.
router.get('/', (req, res) => {
    if (req.session.token) {
      return res.send(`
        <h1>Bienvenido de nuevo</h1>
        <a href="/dashboard">Ir al Dashboard</a><br>
        <form action="/logout" method="post"><button type="submit">Logout</button></form>
      `);
    }
    return res.send(`
      <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Iniciar sesión</button>
      </form>
    `);
  });

  // Login, aquí se procesa el formulario de login. Si las credenciales son correctas, 
  //se genera un token JWT y se almacena en la sesión.
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (user) {
      const token = generarToken(user);
      req.session.token = token;  // Almacenar el token en la sesión
      return res.redirect('/dashboard');
    } else {
      return res.status(401).send('Credenciales incorrectas');
    }
  });

  // Dashboard/Ruta protegida. Solo los usuarios con un token válido pueden acceder.
  //Muestra la información del usuario.
router.get('/dashboard', verificarToken, (req, res) => {
    const user = users.find(u => u.id === req.userId);
    if (user) {
      return res.send(`
        <h1>Bienvenido, ${user.name}</h1>
        <p>Usuario: ${user.username}</p>
        <a href="/">Home</a>
        <form action="/logout" method="post"><button type="submit">Logout</button>
        </form>
      `);
    } else {
      return res.status(404).send('Usuario no encontrado');
    }
  });

  // Logout, permite cerrar la sesión y destruir el token de sesión.
router.post('/logout', (req, res) => {
    req.session.destroy();  // Destruye la sesión
    res.redirect('/');
  });
  
  module.exports = router;