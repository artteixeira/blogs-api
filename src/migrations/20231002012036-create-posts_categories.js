'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTables('posts_categories');
  }
};
