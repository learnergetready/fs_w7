const mongoose = require('mongoose')
const Blog = require('./models/blog')
/*
const twoBlogs = [
  {
    'title': 'Own blog',
    'author': 'Themselves',
    'url': 'http://hs.fi',
    'likes': 0,
  },
  {
    'title': 'Other blog',
    'author': 'Someone',
    'url': 'localhost:3001',
    'likes': 1,
  },
]
*/
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fox-person-himmel:${password}@cluster0.gekqkha.mongodb.net/testBlogilista?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
/*
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
*/
const blog = new Blog(  {
  title: 'Other blog',
  author: 'Someone',
  url: 'localhost:3001',
  likes: 1,
},)


blog.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})

/*
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/
