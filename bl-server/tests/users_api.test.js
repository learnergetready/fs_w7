const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const username = helper.initialUser.username
    const password = helper.initialUser.password

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, passwordHash })

    await user.save()
  })

  test("user creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("user creation fails with proper statuscode and message if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("user creation fails with proper statuscode and message if username is missing", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toMatch(/username.+is required/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("user creation fails with proper statuscode and message if password is missing", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Minimum length for a password is")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("user creation fails with proper statuscode and message if username is short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username")
    expect(result.body.error).toContain("shorter than the minimum")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("user creation fails with proper statuscode and message if password is short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "bombaclotjöti34wtji4tjifhiewat4ieiaut",
      name: "Superuser",
      password: "sa",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Minimum length for a password is")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
