'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //Table brands
    await queryInterface.createTable('brands', {
      brandID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      brandName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    //Table roles
    await queryInterface.createTable('roles', {
      roleID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    //Table users
    await queryInterface.createTable('users', {
      userID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
      },
      roleID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      failedAttempt: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      logTime: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('users', {
      fields: ['roleID'],
      type: 'foreign key',
      name: 'fk_role',
      references: {
        table: 'roles',
        field: 'roleID',
      },
    });

    //refreshTokens
    await queryInterface.createTable('refreshTokens', {
      tokenID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiryTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'1 week\''),
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('refreshTokens', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'fk_user',
      references: {
        table: 'users',
        field: 'userID',
      },
      onDelete: 'CASCADE',
    });

    //Table Categories
    await queryInterface.createTable('categories', {
      categoryID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createTime: {
        type: Sequelize.DATE,
      },
      updateTime: {
        type: Sequelize.DATE,
      },
    });

    //Table Products
    await queryInterface.createTable('products', {
      productID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryID: {
        type: Sequelize.BIGINT,
      },
      brandID: {
        type: Sequelize.BIGINT,
      },
      imageURL: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('products', {
      fields: ['categoryID'],
      type: 'foreign key',
      name: 'fk_category',
      references: {
        table: 'categories',
        field: 'categoryID',
      },
    });
    await queryInterface.addConstraint('products', {
      fields: ['brandID'],
      type: 'foreign key',
      name: 'fk_brand',
      references: {
        table: 'brands',
        field: 'brandID',
      },
    });

    //Table ProductDetails
    await queryInterface.createTable('productDetails', {
      productDetailID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      productID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      specifications: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      warrantyPeriod: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('productDetails', {
      fields: ['productID'],
      type: 'foreign key',
      name: 'fk_product',
      references: {
        table: 'products',
        field: 'productID',
      },
    });

    //Table Orders
    await queryInterface.createTable('orders', {
      orderID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('orders', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'fk_user_order',
      references: {
        table: 'users',
        field: 'userID',
      },
    });

    //Table OrderDetails
    await queryInterface.createTable('orderDetails', {
      orderDetailID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      orderID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      productID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('orderDetails', {
      fields: ['orderID'],
      type: 'foreign key',
      name: 'fk_order',
      references: {
        table: 'orders',
        field: 'orderID',
      },
    });
    await queryInterface.addConstraint('orderDetails', {
      fields: ['productID'],
      type: 'foreign key',
      name: 'fk_product_order',
      references: {
        table: 'products',
        field: 'productID',
      },
    });

    //Table Carts
    await queryInterface.createTable('carts', {
      cartID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('carts', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'fk_user_cart',
      references: {
        table: 'users',
        field: 'userID',
      },
    });

    //Table CartItems
    await queryInterface.createTable('cartItems', {
      cartItemID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      cartID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      productID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('cartItems', {
      fields: ['cartID'],
      type: 'foreign key',
      name: 'fk_cart',
      references: {
        table: 'carts',
        field: 'cartID',
      },
    });
    await queryInterface.addConstraint('cartItems', {
      fields: ['productID'],
      type: 'foreign key',
      name: 'fk_product_cart',
      references: {
        table: 'products',
        field: 'productID',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa bảng theo thứ tự phụ thuộc
    await queryInterface.dropTable('cartItems');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('orderDetails');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('productDetails');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('refreshTokens');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('brands');
  },
};
