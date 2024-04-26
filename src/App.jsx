import React from 'react'
import Comment from './components/Comment.jsx'
import './App.css'
import services from './services/services.js'

function App() {

  // ** State Hooks ** //
  const [comments, setComments] = React.useState([])
  const [newComment, setNewComment] = React.useState('')
  const [showAll, setShowAll] = React.useState(true)

  // ** useEffect Hooks ** //
React.useEffect(() => {
  services
    .getAll()
    .then(response => {
      setComments(response.data)
    })
}, [])

const addComment = (event) => {
  event.preventDefault()
  const commentObject = {
    content: newComment,
  }

  services
    .create(commentObject)
    .then(response => {
      setComments(comments.concat(response.data))
      setNewComment('')
    })
}

  return (
    <React.Fragment>
      <Comment/>
    </React.Fragment>
  )
}

export default App