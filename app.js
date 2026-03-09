const sequelize = require('./database');
const Usuario = require('./models/usuario');
const Publicacion = require('./models/publicacion');

// definimos las relaciones
Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);

async function main() {
  await sequelize.authenticate();
  console.log('Conexion a la base de datos exitosa.');

  await sequelize.sync();
  console.log('Tablas sincronizadas.');

  // Creamos usuario
  const nuevoUsuario = await Usuario.create({ nombre: 'Carlos', email: 'carlos@example.com' });
  console.log(`Usuario creado: ${nuevoUsuario.nombre}`);

  // creamos la publicacion asociada al user
  await nuevoUsuario.createPublicacion({
    titulo: 'Mi primera publicacion',
    contenido: 'Este es el contenido de mi post, creado con Sequelize.',
  });
  console.log('Publicacion creada y asociada al usuario.');

  // Verificamos la relacion
  const usuarioConPublicaciones = await Usuario.findByPk(nuevoUsuario.id, {
    include: Publicacion,
  });
  console.log(JSON.stringify(usuarioConPublicaciones, null, 2));

  await sequelize.close();
}

main();