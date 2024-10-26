"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.ENUM,
      values: ["No priority", "Urgent", "High", "Medium", "Low"],
      defaultValue: "No priority",
      allowNull: false,
    });
  },

  async down(queryInterface, _) {
    await queryInterface.removeColumn("Tasks", "priority");

    // Drop the ENUM type only if it exists
    await queryInterface.sequelize.query(
      "DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Tasks_priority') THEN DROP TYPE enum_Tasks_priority; END IF; END $$;"
    );
  },
};
