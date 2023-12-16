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
  const blogIDtoDelete = request.params.id.toString()

  if (!request.user) {
    return response.status(401).json({ error: "token invalid" })
  }
  const blogToDelete = await Blog.findById({ _id: blogIDtoDelete })

  if (blogToDelete.user.toString() !== request.user) {
    return response.status(401).json({
      error: "only the user, who added the blog, can remove the blog",
    })
  }

  await Blog.deleteOne({ _id: blogIDtoDelete })

  const user = await User.findById(request.user)
  user.blogs = user.blogs.filter(
    (blog) => blog._id.toString() !== blogIDtoDelete,
  )
  await user.save()

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
  if (!request.user) {
    return response.status(401).json({ error: "token invalid" })
  }

  const incomingBlog = request.body
  await Blog.findByIdAndUpdate(request.params.id, incomingBlog)
  response.status(200).end()
})

blogsRouter.post("/:id/comments", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token invalid" })
  }
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  await blog.save()
  response.status(201).end()
})

module.exports = blogsRouter
