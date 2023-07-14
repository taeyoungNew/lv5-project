"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // 자동적으로 1씩 증가
        primaryKey: true, // 기본키
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        unique: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
