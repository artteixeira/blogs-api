module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
  });

  UserModel.associate = ({ BlogPost }) => {
    UserModel.hasMany(BlogPost, {
      foreignKey: 'id', as: 'blogpost'
    });
  };

  return UserModel;
};