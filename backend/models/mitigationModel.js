const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const Mitigation = sequelize.define('Mitigation',{
    mitigation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pre_mitigation_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_mitigation_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    applied_on: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
},  
    {
    timestamp: false,
}
);

module.exports = Mitigation;