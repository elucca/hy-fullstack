const usersRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password

  if (!validatePassword(password)) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long.' })
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: hashedPassword
  })

  try {
    savedUser = await user.save()
    response.json(savedUser)
  } catch (err) {
    // Could get the actual error here and discriminate between non-unique and too short-cases.
    return response.status(400).json({ error: 'Username must be unique and at least 3 characters strong.' })
  }
})

const validatePassword = (password) => {
  if (password === undefined || password.length < 3) {
    return false
  }
  return true
}

module.exports = usersRouter