const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.insertUsers()
  })

  test('a user cannot be created when its username is not unique', async () => {
    const user = helper.initialUsers[0] // Send one that is already in db

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})