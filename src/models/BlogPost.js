module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER, 
      foreignKey: true,
      allowNull: false,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'blog_posts'
  });

  BlogPostModel.associate = ({ User }) => {
    BlogPostModel.belongsTo(User, {
      foreignKey: 'id', as: 'users'
    });
  };

  return BlogPostModel;
};