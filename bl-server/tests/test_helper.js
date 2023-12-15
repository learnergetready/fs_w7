const User = require("../models/user")
const Blog = require("../models/blog")

const getInitialBlogs = async () => {
  const userWhoAdded = await User.findOne({})

  const blogs = [
    {
      title: "Own blog",
      author: "Themselves",
      url: "http://hs.fi",
      likes: 0,
      user: userWhoAdded.id,
    },
    {
      title: "Other blog",
      author: "Someone",
      url: "localhost:3001",
      likes: 1,
      user: userWhoAdded.id,
    },
  ]

  return blogs
}

const initialUser = {
  username: "root",
  name: "the root user",
  password: "sekret",
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const getTokenObject = async (api, user = initialUser) => {
  const loginResponse = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password })

  return loginResponse.body
}

module.exports = {
  getInitialBlogs,
  initialUser,
  blogsInDb,
  usersInDb,
  getTokenObject,
}
