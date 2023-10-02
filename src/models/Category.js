module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: { 
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    underscored: true,
    tableName: 'categories',
    timestamps: false,
  });

  return CategoryModel;
};