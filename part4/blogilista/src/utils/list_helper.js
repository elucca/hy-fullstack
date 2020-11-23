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

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
