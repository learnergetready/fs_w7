const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.find({ _id: request.params.id }).populate("user", {
    username: 1,
    name: 1,
  })
  response.json(blog)
})

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token invalid" })
  }
  const blogToDelete = await Blog.findById({ _id: request.params.id })

  if (blogToDelete.user.toString() !== request.user) {
    return response.status(401).json({
      error: "only the user, who added the blog, can remove the blog",
    })
  }

  await Blog.deleteOne({ _id: request.params.id })
  response.status(204).end()
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  if (!request.user) {
    return response.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response) => {
  const incomingBlog = request.body
  await Blog.findByIdAndUpdate(request.params.id, incomingBlog)
  response.status(200).end()
})

module.exports = blogsRouter
