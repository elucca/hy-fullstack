const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => { return acc + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
  const authorsWithCount = {}
  blogs.forEach(blog => {
    const author = blog.author
    if (author in authorsWithCount) {
      authorsWithCount[author]++
    } else {
      authorsWithCount[author] = 1
    }
  })
  
  const maxAuthor = Object.keys(authorsWithCount).reduce((currMaxAuthor, currAuthor) =>
    currAuthor > currMaxAuthor ? currAuthor : currMaxAuthor)
  return { author: maxAuthor, blogs: authorsWithCount[maxAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
