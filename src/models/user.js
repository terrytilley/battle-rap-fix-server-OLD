export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
    });
  };

  return User;
};
