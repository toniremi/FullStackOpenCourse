const lodash = require('lodash');
const logger = require('./logger');

const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });

  return favorite;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = lodash.countBy(blogs, 'author');
  logger.info('Author counts:', authorCounts);
  const authors = Object.keys(authorCounts);
  logger.info('Authors:', authors);
  const maxAuthor = lodash.maxBy(authors, (author) => authorCounts[author]);
  const maxBlogs = authorCounts[maxAuthor];
  logger.info('Author with most blogs:', maxAuthor, 'with', maxBlogs, 'blogs');
  

  return { author: maxAuthor, blogs: maxBlogs };
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogsByAuthor = lodash.groupBy(blogs, 'author');
  logger.info('Blogs by author:', blogsByAuthor);
  const authorLikesSum = lodash.mapValues(blogsByAuthor, (authorBlogs) => {
    return lodash.sumBy(authorBlogs, 'likes');
  });
  logger.info('Author likes sum:', authorLikesSum);
  const authors = Object.keys(authorLikesSum);
  logger.info('Authors:', authors);
  const maxAuthor = lodash.maxBy(authors, (author) => authorLikesSum[author]);
  const maxLikes = authorLikesSum[maxAuthor];
  logger.info('Author with most likes:', maxAuthor, 'with', maxLikes, 'likes');

  return { author: maxAuthor, likes: maxLikes };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
