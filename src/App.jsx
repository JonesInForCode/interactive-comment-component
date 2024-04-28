import React from "react";
import Comment from "./components/Comment.jsx";
import "./App.css";
import services from "./services/services.js";

function App() {
  // ** State Hooks ** //
  const [comments, setComments] = React.useState([]);
  const [replyVisible, setReplyVisible] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [newTopLevelComment, setNewTopLevelComment] = React.useState("");
  const [replyToCommentId, setReplyToCommentId] = React.useState(null)

  // ** useEffect Hooks ** //
  React.useEffect(() => {
    services
      .getAll()
      .then((initialComments) => {
        setComments(initialComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleReplyClick = (commentId) => {
    setReplyVisible(true);
    setReplyToCommentId(commentId)

  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentObject = {
      content: newTopLevelComment,
    };

    services
      .create(commentObject)
      .then((returnedComment) => {
        setComments(comments.concat(returnedComment));
        setNewTopLevelComment("");
        setReplyVisible(false);
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            key={comment.id}
            id={comment.id}
            username={comment.user.username}
            avatar={comment.user.image.png}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            replies={comment.replies || []}
            reply={handleReplyClick}
            replyToCommentId={replyToCommentId}
            replyText={replyText}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            replyVisible={replyVisible}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
