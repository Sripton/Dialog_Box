const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Direction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Direction.init(
    {
      img: DataTypes.STRING,
      description: DataTypes.TEXT,
      tabContent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Direction",
    }
  );
  return Direction;
};
