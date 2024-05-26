"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove old columns
    // await queryInterface.removeColumn("Tasks", "company_name");
    // Add new columns
    // await queryInterface.addColumn("Tasks", "platform", {
    //   type: Sequelize.STRING,
    // });
    // await queryInterface.addColumn("Tasks", "assigned_to", {
    //   type: Sequelize.STRING,
    // });
    // Modify column types if necessary (change from TEXT to STRING for description)
    // await queryInterface.changeColumn("Tasks", "description", {
    //   type: Sequelize.STRING,
    // });
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

    // Revert column types if necessary (change from STRING back to TEXT for description)
    await queryInterface.changeColumn("Tasks", "description", {
      type: Sequelize.TEXT,
    });
  },
};
