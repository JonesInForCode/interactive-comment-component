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
    .then(initialComments => {
      setComments(initialComments)
    })
}, [])

const addComment = (event) => {
  event.preventDefault()
  const commentObject = {
    content: newComment,
  }

  services
    .create(commentObject)
    .then(returnedComment => {
      setComments(comments.concat(returnedComment))
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