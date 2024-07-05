const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LocationC = require('./locationC');

const Sensor = sequelize.define('sensor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sensor_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_reading_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: LocationC,
            key: 'location_id',
        },
    },
});

module.exports = Sensor;
