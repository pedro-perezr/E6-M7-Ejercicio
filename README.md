E6-M7 Ejercicio
Modelado de Relaciones en un Blog Básico 🧑‍💻➡️📝
Objetivo: Aprender a definir y utilizar relaciones entre modelos de Sequelize. Implementarás una de las relaciones más comunes, la de "uno a muchos" (one-to-many), para modelar un sistema de blog simple donde un usuario puede tener múltiples publicaciones, y cada publicación pertenece a un único usuario.

Prerrequisitos:

Tener acceso a una base de datos PostgreSQL. Sequelize se encargará de crear las tablas y las claves foráneas necesarias.

Instrucciones:

Paso 1: Estructura del Proyecto
Es una buena práctica organizar los modelos en su propia carpeta.

Asegúrate de tener sequelize, pg y pg-hstore instalados.

Crea una carpeta models en tu proyecto.

Dentro de models, crearás dos archivos: Usuario.js y Publicacion.js.

Paso 2: Definición de los Modelos
1. Modelo Usuario.js

Define un modelo Usuario con atributos básicos como nombre (STRING) y email (STRING).

2. Modelo Publicacion.js

Define un modelo Publicacion con atributos como titulo (STRING) y contenido (TEXT).

Paso 3: Establecimiento de la Relación
Aquí es donde ocurre la magia. Después de definir ambos modelos, necesitas asociarlos. Puedes hacer esto en un archivo central, como app.js, o en un archivo de inicialización de modelos.

Importa ambos modelos en tu archivo principal (app.js).

Define la asociación:

Usuario.hasMany(Publicacion): Esto le dice a Sequelize que una instancia de Usuario puede estar asociada con muchas instancias de Publicacion.

Publicacion.belongsTo(Usuario): Esto establece el otro lado de la relación, indicando que cada Publicacion pertenece a un solo Usuario. Al hacer esto, Sequelize automáticamente añadirá una columna UsuarioId a la tabla Publicaciones, que actuará como la clave foránea.

Paso 4: Sincronización y Creación de Datos Relacionados
En tu app.js, crearás un script para sincronizar los modelos y probar la relación.

Sincroniza la base de datos: Llama a sequelize.sync() para que Sequelize cree las tablas Usuarios y Publicaciones, incluyendo la columna de clave foránea UsuarioId.

Crea un script asíncrono: Dentro de una función async, realiza las siguientes acciones:

Crea un usuario: Usa Usuario.create() para crear un nuevo usuario.

const nuevoUsuario = await Usuario.create({ nombre: 'Carlos', email: 'carlos@example.com' });

 
Crea una publicación asociada: El método .create() está disponible en la instancia del usuario gracias a la relación hasMany. Sequelize se encarga de asignar el UsuarioId automáticamente.

await nuevoUsuario.createPublicacion({
    titulo: 'Mi primera publicación',
    contenido: 'Este es el contenido de mi post, creado con Sequelize.'
});

 
Verifica la relación (Opcional pero recomendado): Para comprobar que todo funciona, realiza una consulta para obtener el usuario junto con todas sus publicaciones.

const usuarioConPublicaciones = await Usuario.findByPk(nuevoUsuario.id, {
    include: Publicacion
});
console.log(JSON.stringify(usuarioConPublicaciones, null, 2));

