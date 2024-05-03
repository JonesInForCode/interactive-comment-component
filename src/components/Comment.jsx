import { useState } from "react";
import styles from "./Comment.module.css";
import Reply from "./Reply";
import services from "../services/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
  // ** State Hooks ** //
  const [voteCount, setVoteCount] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null);

  // ** functions ** //

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
      score: 0,
    };

    services
      .create(newReply)
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error("Error creating new reply", error);
      });

    setCurrentReplyId(null);
    setReplyText("");
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      services
        .deleteById(id)
        .then(console.log(id))
        .then(() => {
          console.log(id);
          fetchComments();
          setIsDeleting(false);
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting comment", error);
          setIsDeleting(false);
          setShowDeleteModal(false);
        });
    }
  };
  const handleReplyClick = (id) => {
    closeOtherReplyBoxes(id);
    setCurrentReplyId(id === currentReplyId ? null : id);
  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleUpvote = () => {
    if (voteStatus === "upvoted") {
      setVoteStatus(null);
      setVoteCount((prevVoteCount) => prevVoteCount - 1);
    } else if (voteStatus === "downvoted") {
      setVoteStatus("upvoted");
      setVoteCount((prevVoteCount) => prevVoteCount + 2);
    } else {
      setVoteStatus("upvoted");
      setVoteCount((prevVoteCount) => prevVoteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (voteStatus === "downvoted") {
      setVoteStatus(null);
      setVoteCount((prevVoteCount) => prevVoteCount + 1);
    } else if (voteStatus === "upvoted") {
      setVoteStatus("downvoted");
      setVoteCount((prevVoteCount) => prevVoteCount - 2);
    } else {
      setVoteStatus("downvoted");
      setVoteCount((prevVoteCount) => prevVoteCount - 1);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
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

  // Helper function that looks for @usernames in the comment and turns them into links(fakelinks)
  const highlightMentions = (content) => {
    const mentionRegex = /@(\w+)/g;
    const parts = [];

    let match;
    let lastIndex = 0;

    while ((match = mentionRegex.exec(content)) !== null) {
      const username = match[1];
      const beforeMention = content.slice(lastIndex, match.index);
      const mentionText = match[0];

      parts.push(beforeMention);
      parts.push(
        <span key={match.index} className={styles.mention}>
          {mentionText}
        </span>
      );

      lastIndex = mentionRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
    return parts;
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleEditChange = (event) => {
    setEditedContent(event.target.value);
  };

  const saveEdit = () => {
    if (!editedContent.trim()) {
      console.error("Empty reply");
      return;
    }
    const editedReply = {
      content: editedContent,
    };
    services
      .update(id, editedReply)
      .then(console.log(id))
      .then(() => {
        fetchComments();
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error("Error editing reply", error);
      });
  };

  return (
    <>
      <div className={styles.commentCard}>
        <div className={styles.votes}>
          <button
            className={`${styles.voteBtnUp} ${
              voteStatus === "upvoted" ? styles.active : ""
            }`}
            onClick={() => handleUpvote("upvote")}
            disabled={voteStatus === "downvoted"}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <div className={styles.voteTxt}>{score + voteCount}</div>
          <button
            className={`${styles.voteBtnDown} ${
              voteStatus === "downvoted" ? styles.active : ""
            }`}
            onClick={() => handleDownvote("downvote")}
            disabled={voteStatus === "upvoted"}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.commentInfoTitle}>
            <img src={avatar} className={styles.avatar} alt={username} />
            <p className={styles.date}>
              {username}{" "}
              {currentUser && currentUser.username === username && (
                <FontAwesomeIcon icon={faUser} />
              )}{" "}
              <span>{createdAt}</span>
            </p>
            <div className={styles.postModicationBtns}>
              {isTopLevel && (
                <button
                  className={styles.replyBtn}
                  onClick={() => handleReplyClick(id)}
                >
                  <FontAwesomeIcon icon={faReply} />
                </button>
              )}

              {currentUser && currentUser.username === username && (
                <>
                  <button className={styles.editBtn} onClick={toggleEditMode}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleDeleteClick}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </div>
          {isEditMode ? (
            <>
              <textarea
                className={styles.editTextarea}
                value={editedContent}
                onChange={handleEditChange}
                autoFocus
              />
              <button className={styles.saveEditBtn} onClick={saveEdit}>
                save
              </button>
            </>
          ) : (
            <p>{isEditMode ? editedContent : highlightMentions(content)}</p>
          )}
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
          <div className={styles.repliesWrapper}>
            {replies.map((reply) => (
              <div key={reply.id}>
                <Comment
                  id={reply.id}
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
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          handleClose={handleCloseModal}
          handleDelete={handleConfirmDelete}
          commentId={id}
        />
      )}
    </>
  );
}
