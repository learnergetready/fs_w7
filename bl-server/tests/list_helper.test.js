const listHelper = require("../utils/list_helper")

const someBlogs = [
  {
    _id: "6548e70e158ea0e28419ced5",
    title: "Own blog",
    author: "Themselves",
    url: "http://hs.fi",
    likes: 0,
    __v: 0,
  },
  {
    _id: "6548e7ba748230defea4a7f0",
    title: "Own blog",
    author: "Themselves",
    url: "http://hs.fi",
    likes: 0,
    __v: 0,
  },
  {
    _id: "654a940dedfebae3af453627",
    title: "Other blog",
    author: "Someone",
    url: "localhost:3001",
    likes: 1,
    __v: 0,
  },
  {
    _id: "654bc4b06e745b689f0bf5e0",
    title: "Third blog",
    author: "Someone third",
    url: "localhost:3001",
    likes: 0,
    __v: 0,
  },
  {
    _id: "654bca7163991bffcf48c742",
    title: "Fourth blog",
    author: "Themselves",
    url: "localhost:3001",
    likes: 0,
    __v: 0,
  },
  {
    _id: "654d172546f0f8fbaa8982bb",
    title: "Sixth blog",
    author: "Someone else",
    url: "localhost:3001",
    likes: 7,
    __v: 0,
  },
]

describe("4.3 dummy", () => {
  test("returns one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe("4.4 total likes", () => {
  test("from several blogs with 0 to 7 likes", () => {
    const result = listHelper.totalLikes(someBlogs)
    expect(result).toBe(8)
  })

  test("from several blogs with 0 likes", () => {
    const result = listHelper.totalLikes(
      someBlogs.filter((blog) => blog.likes === 0),
    )
    expect(result).toBe(0)
  })

  test("from just one blog with 1 like", () => {
    const result = listHelper.totalLikes(someBlogs[2])
    expect(result).toBe(1)
  })

  test("from an empty list gives 0", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe("4.5 favoriteBlog", () => {
  test("from blogs with 0 to 7 likes", () => {
    const result = listHelper.favoriteBlog(someBlogs)
    expect(result).toEqual(someBlogs[5])
  })
})

describe("4.6 mostBlogs", () => {
  test("from authors with 1 to 3 blogs", () => {
    const result = listHelper.mostBlogs(someBlogs)
    expect(result).toEqual({ author: "Themselves", blogs: 3 })
  })
})

describe("4.7 mostLikes", () => {
  test("from authors with 0 to 7 likes, 7 in one blog", () => {
    const result = listHelper.mostLikes(someBlogs)
    expect(result).toEqual({ author: "Someone else", likes: 7 })
  })
})
