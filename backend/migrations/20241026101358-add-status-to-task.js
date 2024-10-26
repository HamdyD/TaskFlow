"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "status", {
      type: Sequelize.ENUM,
      values: ["Backlog", "To do", "In Progress", "Done", "Canceled"],
      defaultValue: "Backlog",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "status");

    // Drop the ENUM type only if it exists
    await queryInterface.sequelize.query(
      "DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Tasks_status') THEN DROP TYPE enum_Tasks_status; END IF; END $$;"
    );
  },
};
