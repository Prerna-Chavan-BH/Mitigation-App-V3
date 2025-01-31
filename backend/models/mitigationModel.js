const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const Mitigation = sequelize.define('Mitigation',{
    mitigationId: {
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
        validate: {
            min: 1,
            max: 5
        }
    },
    post_mitigation_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    applied_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},  
    {
    timestamp: false,
}
);

module.exports = Mitigation;