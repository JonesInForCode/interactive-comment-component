import React from "react";
import Comment from "./components/Comment.jsx";
import "./App.css";
import services from "./services/services.js";

function App() {
  // ** State Hooks ** //
  const [comments, setComments] = React.useState([]);
  const [showAll, setShowAll] = React.useState(true);
  const [replyVisible, setReplyVisible] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [newTopLevelComment, setNewTopLevelComment] = React.useState("");

  // ** useEffect Hooks ** //
  React.useEffect(() => {
    services
      .getAll()
      .then((initialComments) => {
        setComments(initialComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleReplyClick = () => {
    setReplyVisible(true);
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
        setReplyVisible(false)
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleCloseReply = () => {
    setReplyVisible(false);
    setReplyText("");
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            username={comment.user.username}
            avatar={comment.user.image.png}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            replies={comment.replies || []}
            replyVisibility={replyVisible}
            reply={handleReplyClick}
            input={handleInputChange}
            closeReply={handleCloseReply}
          />
          <form onSubmit={handleSubmit}>
            <textarea
              value={newTopLevelComment}
              onChange={(event) => setNewTopLevelComment(event.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
