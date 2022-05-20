const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const productos = [
  {
    id: 1,
    nombre: 'Laptop',
  },
  {
    id: 2,
    nombre: 'Monitor',
  },
  {
    id: 3,
    nombre: 'Mouse',
  },
  {
    id: 4,
    nombre: 'Teclado',
  }
]

// Settings
app.set('port', process.env.PORT || 3000);
app.set('appName', 'Lechucero iniciado...');

// Static File
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Para poder recibir datos de un formulario
app.use(express.json()); // Funcion que sirve para entender los datos json desde el navegador

app.get('/', (req, res) => {
  res.send('Saludos Terricola');
});

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  console.log(req.body);
  const { nombre } = req.body;
  productos.push({
    id: productos.length + 1,
    nombre
  });
  res.json('Producto agregado OK');
});

app.put('/productos/:id', (req, res) => {
  console.log();
  const { id } = req.params;
  const { nombre } = req.body;

  productos.forEach((producto, i) => {
    if(productos.id == id) {
      producto.nombre = nombre;
    };
  });

  res.json('Producto actualizado OK');
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  productos.forEach((producto, i) => {
    if(producto.id == id) {
      producto.splice(i, 1);
    };
  });
  res.json('Producto eliminado OK');
})

app.listen(app.get('port'), () => {
  console.log('Server: ', app.get('appName'));
});
