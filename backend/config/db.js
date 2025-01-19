const Sequelize = require('sequelize');

const sequelize = new Sequelize('Mitigation_DB', 'postgres', 'Mermaidpc@0313',{
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;