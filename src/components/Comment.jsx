import React from "react";
import styles from "./Comment.module.css";

export default function Comment() {
  const [voteCount, setVoteCount] = React.useState(0);
  const [replyVisible, setReplyVisible] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");

  const handleUpvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount + 1);
  };

  const handleDownvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount - 1);
  };

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

  return (
    <>
      <div className={styles.commentCard}>
        <div className={styles.votes}>
          <button onClick={handleUpvote}>+</button>
          <div>{voteCount}</div>
          <button onClick={handleDownvote}>-</button>
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.commentInfoTitle}>
            <img
              src="../../images/avatars/image-amyrobson.png"
              className={styles.avatar}
            />
            <p>
              Username <span>date</span>
            </p>
            <button onClick={handleReplyClick}>reply</button>
          </div>
    
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco labrois nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
      {replyVisible && (
        <div>
          <textarea
            value={replyText}
            onChange={handleInputChange}
            placeholder="Write a reply..."
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
}
