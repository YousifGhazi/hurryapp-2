const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationC = sequelize.define('locationC', {
    location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = LocationC;
