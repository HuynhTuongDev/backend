module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'discount', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'discount');
  },
};
