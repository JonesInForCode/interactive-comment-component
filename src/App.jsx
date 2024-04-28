import React from 'react'
import Comment from './components/Comment.jsx'
import './App.css'
import services from './services/services.js'

function App() {

  // ** State Hooks ** //
  const [comments, setComments] = React.useState([])
  const [newComment, setNewComment] = React.useState('')
  const [showAll, setShowAll] = React.useState(true)
  const [replyVisible, setReplyVisible] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");

  // ** useEffect Hooks ** //
React.useEffect(() => {
  services
    .getAll()
    .then(initialComments => {
      setComments(initialComments)
    })
    .catch(error => console.error('Error fetching comments:', error));
}, []);

const addComment = (event) => {
  event.preventDefault()
  const commentObject = {
    content: newComment,
  }

  const handleReplyClick = () => {
    setReplyVisible(true);
  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Reply submitted:", replyText);

    setReplyText("");
    setReplyVisible(false);
  };


  services
    .create(commentObject)
    .then(returnedComment => {
      setComments(comments.concat(returnedComment))
      setNewComment('')
    })
}

  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          username={comment.user.username}
          avatar={comment.user.image.png}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          replies={comment.replies || []}
          />
      ))}
    </div>
  )
}

export default App