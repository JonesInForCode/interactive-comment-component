import { useState } from "react";
import services from "../services/services";
import styles from "./CreateComment.module.css";

const CreateComment = ({ fetchComments, currentUser }) => {
// ** State Hooks ** //
const [newComment, setNewComment] = useState("");
const [isLoading, setIsLoading] = useState(false);

// ** Functions ** //

const handleNewCommentChange = (event) => {
  setNewComment(event.target.value);
};

const handleCreateCommentSubmit = (newContent) => {
    if (!newContent.trim()) {
          console.error("Empty comment");
          return;
        }
        const newComment = {
          content: newContent,
          user: {
            username: currentUser.username,
            image: {
              png: currentUser.image.png,
            },
          },
          score: 0,
        };
    services.create(newComment)
         .then(() => {
            fetchComments();
            setNewComment("");
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error creating new comment", error);
          });
};

const handleCreateCommentClick = () => {
  setIsLoading(true);
  handleCreateCommentSubmit(newComment);
};

    return (
        <div className={styles.createContainer}>
          <img src={currentUser.image.png} className={styles.avatar} alt={currentUser.username} />
            <textarea
                className={styles.createComment}
                value={newComment}
                onChange={handleNewCommentChange}
                placeholder="Write a comment..."
            />
            <button className={styles.submitBtn} type="submit" onClick={handleCreateCommentClick} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
            </button>
        </div>
    )
}

export default CreateComment;