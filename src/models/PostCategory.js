module.exports = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true
  });

  PostCategoryModel.associate = ({ BlogPost, Category }) => {

    BlogPost.belongsToMany(Category, {
      through: PostCategoryModel,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });

    Category.belongsToMany(BlogPost, {
      through: PostCategoryModel,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    });
  };

  return PostCategoryModel;
};