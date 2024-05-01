import React from "react";
import Comment from "./components/Comment.jsx";
import "./App.css";
import CreateComment from "./components/CreateComment.jsx";
import services from "./services/services.js";

function App() {
  // ** State Hooks ** //
  const [comments, setComments] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  // ** functions ** //
  const fetchComments = () => {
    services
      .getAll()
      .then((initialData) => {
        setComments(initialData.comments);
        setCurrentUser(initialData.currentUser);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  };

  // ** useEffect Hooks ** //
  React.useEffect(() => {
    fetchComments();
  }, []);

  React.useEffect(() => {
    services
      .getAll()
      .then((initialData) => {
        setComments(initialData.comments);
        setCurrentUser(initialData.currentUser);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  return (
    <React.Fragment>
      <div className="commentArea">
        {comments.length > 0 || null ? (
          comments.map((comment) => (
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
              fetchComments={fetchComments}
            />
          ))
        ) : (
          <p>Loading comments...</p>
        )}
      </div>
      {/* Render CreateComment only if currentUser is not null */}
      {currentUser && (
        <div className="createComment">
          <CreateComment
            currentUser={currentUser}
            fetchComments={fetchComments}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
