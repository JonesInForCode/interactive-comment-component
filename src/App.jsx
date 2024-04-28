import React from "react";
import Comment from "./components/Comment.jsx";
import "./App.css";
import services from "./services/services.js";

function App() {
  // ** State Hooks ** //
  const [comments, setComments] = React.useState([]);

  // ** useEffect Hooks ** //
  React.useEffect(() => {
    services
      .getAll()
      .then((initialComments) => {
        setComments(initialComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

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
          />
        </div>
      ))}
    </div>
  );
}

export default App;
