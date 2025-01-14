const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

module.exports = () => {
    const Slider = sequelize.define('Slider', {
        sliderID: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'sliderID', // Tên cột trong cơ sở dữ liệu
        },
        imageURL: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'imageURL', // Tên cột trong cơ sở dữ liệu
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'title',
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'description',
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'createdAt',
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'updatedAt',
        },
    }, {
        tableName: 'sliders', // Tên bảng trong cơ sở dữ liệu
        timestamps: true, // Sequelize sẽ tự động quản lý `createdAt` và `updatedAt`
    });

    return Slider;
};
