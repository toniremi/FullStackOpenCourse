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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
