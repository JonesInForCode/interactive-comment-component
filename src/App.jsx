import React from "react";
import Comment from "./components/Comment.jsx";
import "./App.css";
import services from "./services/services.js";

function App() {
  // ** State Hooks ** //
  const [comments, setComments] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  // ** useEffect Hooks ** //
  React.useEffect(() => {
    services
      .getAll()
      .then((initialData) => {
        setComments(initialData.comments);
        setCurrentUser(initialData.currentUser)
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
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
              currentUser={currentUser}
            />
          </div>
        ))
      ) : (
        <p>Loading comments...</p>
      )}
    </div>
  );
}

export default App;
