'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo bảng Users
    await queryInterface.createTable('Users', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true, // Đảm bảo rằng cột này là khóa chính
      },
      FullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: Sequelize.STRING,
      Phone: Sequelize.STRING(20),
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Role: Sequelize.STRING(50),
      Status: Sequelize.STRING(50),
      LogTime: Sequelize.DATE,
      FailedAttempt: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    // Tạo bảng Category
    await queryInterface.createTable('Category', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CreateTime: Sequelize.DATE,
      UpdateTime: Sequelize.DATE,
    });

    // Tạo bảng Product
    await queryInterface.createTable('Product', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Descr: Sequelize.STRING,
      Image: Sequelize.STRING,
      CategoryID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Category', // Kiểm tra lại tên bảng
          key: 'ID', // Kiểm tra lại cột khóa chính
        },
        onDelete: 'SET NULL',
      },
      Color: Sequelize.STRING(50),
      Version: Sequelize.STRING(50),
      Price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    // Tạo bảng RefreshToken
    await queryInterface.createTable('RefreshToken', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users', // Kiểm tra lại tên bảng
          key: 'ID', // Kiểm tra lại cột khóa chính
        },
        onDelete: 'CASCADE',
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ExpiryTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + interval '1 week'"),
      },
    });

    // Tạo bảng Cart
    await queryInterface.createTable('Cart', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      UserID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      ProductID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Product',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      Quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });

    // Tạo bảng Order
    await queryInterface.createTable('Order', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      Phone: Sequelize.STRING(20),
      Email: Sequelize.STRING,
      FullName: Sequelize.STRING,
      Address: Sequelize.STRING,
      District: Sequelize.STRING,
      Ward: Sequelize.STRING,
      Province: Sequelize.STRING,
      CustomNote: Sequelize.TEXT,
      PaymentMethod: Sequelize.STRING(50),
      Status: Sequelize.STRING(50),
      CreateTime: Sequelize.DATE,
      UserID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'ID',
        },
        onDelete: 'SET NULL',
      },
    });

    // Tạo bảng Order_Detail
    await queryInterface.createTable('Order_Detail', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Original_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Sale_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      ProductID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Product',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      OrderID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Order',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
    });

    // Tạo bảng Feedback
    await queryInterface.createTable('Feedback', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      UserID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      ProductID: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Product',
          key: 'ID',
        },
        onDelete: 'CASCADE',
      },
      Comment: Sequelize.TEXT,
      CreateTime: Sequelize.DATE,
      Status: Sequelize.STRING(255),
    });

    // Tạo bảng Slider
    await queryInterface.createTable('Slider', {
      ID: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      Name: Sequelize.STRING,
      Descr: Sequelize.STRING,
      Image: Sequelize.STRING,
      Title: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa bảng theo thứ tự phụ thuộc
    await queryInterface.dropTable('Slider');
    await queryInterface.dropTable('Feedback');
    await queryInterface.dropTable('Order_Detail');
    await queryInterface.dropTable('Order');
    await queryInterface.dropTable('Cart');
    await queryInterface.dropTable('Product');
    await queryInterface.dropTable('Category');
    await queryInterface.dropTable('RefreshToken');
    await queryInterface.dropTable('Users');
  },
};
