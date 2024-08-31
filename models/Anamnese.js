const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de ter o arquivo de configuração do banco de dados

const Anamnese = sequelize.define('Anamnese', {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rimel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gestante: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  procedimento_olhos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alergia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  especificar_alergia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tireoide: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  problema_ocular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  especificar_ocular: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  oncologico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dorme_lado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dorme_lado_posicao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  problema_informar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  procedimento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mapping: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estilo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modelo_fios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  espessura: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  curvatura: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adesivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'Fichas_Anamnese', // Nome da tabela no banco de dados
});

module.exports = Anamnese;
