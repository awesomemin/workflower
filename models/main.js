const Sequelize = require('sequelize');

module.exports = class Main extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      keyword: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      situation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      process: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      paranoid: false,
      modelName: 'Main',
      tableName: 'main',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  };
}