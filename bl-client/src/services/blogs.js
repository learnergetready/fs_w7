import axios from "axios"
const baseUrl = "http://localhost:3001/api/blogs" //'/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const formatedBlog = { ...updatedBlog, user: updatedBlog.user.id }
  delete formatedBlog.id
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id.toString()}`,
    formatedBlog,
    config,
  )
  return response.data
}

const remove = async (blogID) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blogID.toString()}`, config)
}

const comment = async (blogID, newComment) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.post(
    `${baseUrl}/${blogID}/comments`,
    { comment: newComment },
    config,
  )
}

export default { setToken, getAll, create, update, remove, comment }
