import { useState } from "react";
import styles from "./Comment.module.css";
import Reply from "./Reply";
import services from "../services/services";

export default function Comment({
  username,
  avatar,
  content,
  createdAt,
  score,
  replies = [],
  id,
  currentUser,
  fetchComments,
  isTopLevel = true,
}) {
  const [voteCount, setVoteCount] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [comments, setComments] = useState(replies);

  const handleReplySubmit = (replyText) => {
    if (!replyText.trim()) {
      console.error("Empty reply");
      return;
    }
    const newReply = {
      content: replyText,
      user: {
        username: currentUser.username,
        image: {
          png: currentUser.image.png,
        },
      },
      parentId: id,
      createdAt: new Date().toISOString(),
      score: 0,
    };

    services
      .create(newReply)
      .then((response) => {
        fetchComments();
      })
      .catch((error) => {
        console.error("Error creating new reply", error);
      });

    setCurrentReplyId(null);
    setReplyText("");
  };

  const handleReplyClick = (id) => {
    closeOtherReplyBoxes(id);
    setCurrentReplyId(id === currentReplyId ? null : id);
  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleUpvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount + 1);
  };

  const handleDownvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount - 1);
  };

  // Helper function that hide other open comment reply boxes so that the user only ever see's '1 box'
  const closeOtherReplyBoxes = (currentId) => {
    const commentElements = document.querySelectorAll(`.${styles.commentCard}`);
    commentElements.forEach((commentElement) => {
      const replyBoxes = commentElement.querySelectorAll(`.${styles.replyBox}`);
      replyBoxes.forEach((replyBox) => {
        const replyBoxId = parseInt(replyBox.dataset.id);
        if (replyBoxId === currentId) {
          replyBox.style.display = "block";
        } else {
          replyBox.style.display = "none";
        }
      });
    });
  };

  return (
    <>
      <div className={styles.commentCard}>
        <div className={styles.votes}>
          <button onClick={handleUpvote}>+</button>
          <div>{score + voteCount}</div>
          <button onClick={handleDownvote}>-</button>
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.commentInfoTitle}>
            <img src={avatar} className={styles.avatar} alt={username} />
            <p>
              {username} <span>{createdAt}</span>
            </p>
            {/* Only render the reply button for top level comments */}
            {isTopLevel && (
              <button onClick={() => handleReplyClick(id)}>reply</button>
            )}
          </div>
          <p>{content}</p>
        </div>
      </div>
      {/* Conditionally render the reply box only for top level comments */}
      {isTopLevel && currentReplyId === id && (
        <div className={`${styles.replyBox} ${styles.open}`} data-id={id}>
          <Reply
            onSubmit={handleReplySubmit}
            replyText={replyText}
            handleInputChange={handleInputChange}
          />
        </div>
      )}
      {/* Render replies, markig them as not top level */}
      {replies.length > 0 && (
        <div className={styles.repliesContainer}>
          <h3>Replies</h3>
          <div className={styles.repliesWrapper}>
            {replies.map((reply) => (
              <div key={reply.id}>
                <Comment
                  key={reply.id}
                  username={reply.user.username}
                  avatar={reply.user.image.png}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  score={reply.score}
                  replies={reply.replies}
                  currentUser={currentUser}
                  fetchComments={fetchComments}
                  isTopLevel={false} // Indicate that these are not top-level comments
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
