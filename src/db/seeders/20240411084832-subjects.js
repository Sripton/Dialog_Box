/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Subjects",
      [
        {
          subjectName: "Дискретная математика",
          direction_id: 1,
          img: "/img/subjectCard/mathdiscrete.jpg",
        },
        {
          subjectName: "Линейная алгебра",
          direction_id: 1,
          img: "/img/subjectCard/mathlinear.jpg",
        },
        {
          subjectName: "Математическая логика",
          direction_id: 1,
          img: "/img/subjectCard/mathlogic.jpg",
        },
        {
          subjectName: "История России",
          direction_id: 2,
          img: "/img/subjectCard/historyrussia.jpg",
        },
        {
          subjectName: "История Запада",
          direction_id: 2,
          img: "/img/subjectCard/historywest.jpg",
        },
        {
          subjectName: "История Азии",
          direction_id: 2,
          img: "/img/subjectCard/historyasian.jpg",
        },
        {
          subjectName: "Ботаника",
          direction_id: 3,
          img: "/img/subjectCard/biobotanica.jpg",
        },
        {
          subjectName: "Зоология",
          direction_id: 3,
          img: "/img/subjectCard/boizoology.jpg",
        },
        {
          subjectName: "Анатомия",
          direction_id: 3,
          img: "/img/subjectCard/bioanatomy.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
