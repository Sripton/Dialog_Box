const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Subject, Comment, Postlike, Postdislike }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Subject, { foreignKey: "subject_id" });
      this.hasMany(Comment, { foreignKey: "post_id" });
      this.hasMany(Postlike, { foreignKey: "post_id" });
      this.hasMany(Postdislike, { foreignKey: "post_id" });
    }
  }
  Posts.init(
    {
      title: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Posts;
};
