const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Postlike, Postdislike }) {
      // define association here
      this.hasMany(Post, { foreignKey: "user_id" });
      this.hasMany(Comment, { foreignKey: "user_id" });
      this.hasMany(Postlike, { foreignKey: "user_id" });
      this.hasMany(Postdislike, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      userLogin: DataTypes.STRING,
      userPassword: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
