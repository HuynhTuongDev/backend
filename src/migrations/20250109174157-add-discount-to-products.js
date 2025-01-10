module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'discount', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true, // Bạn có thể đặt là false nếu không muốn giá trị null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'discount');
  },
};
