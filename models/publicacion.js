const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Publicacion;