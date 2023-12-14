import { useField } from "../hooks"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.forInput} />
          </div>
          <div>
            author
            <input {...author.forInput} />
          </div>
          <div>
            url for more info
            <input {...info.forInput} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew