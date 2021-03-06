const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  if (!token) {
    return response
      .status(401)
      .json({ error: 'You are not logged in (Token is missing.).' })
  }

  decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'You are not logged in (Token is invalid).' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user === undefined ? undefined : user,
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  if (!token) {
    return response
      .status(401)
      .json({ error: 'You are not logged in (Token is missing.).' })
  }

  decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'You are not logged in (Token is invalid).' })
  }

  const blogToDelete = await blog.findById(request.params.id)

  if (blogToDelete.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }

  return response
    .status(401)
    .json({ error: 'Cannot delete blog: It belongs to someone else.' })
})

blogsRouter.delete('/', async (request, response) => {
  await Blog.remove({})
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
