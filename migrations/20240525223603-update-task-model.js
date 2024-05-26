"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

  },

  down: async (queryInterface, Sequelize) => {
    // Revert adding new columns
    await queryInterface.removeColumn("Tasks", "platform");
    await queryInterface.removeColumn("Tasks", "assigned_to");

    // Revert removing old columns
    await queryInterface.addColumn("Tasks", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Tasks", "platform_service_product", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Tasks", "issue_description", {
      type: Sequelize.TEXT,
    });

    await queryInterface.changeColumn("Tasks", "description", {
      type: Sequelize.TEXT,
    });
  },
};
