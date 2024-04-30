import { useState } from "react";
import services from "../services/services";

const CreateComment = () => {
// ** State Hooks ** //
const [inputText, setInputText] = useState("");
const [newComment, setNewComment] = useState("");
const [isLoading, setIsLoading] = useState(false);

// ** Functions ** //

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
          createdAt: new Date().toISOString(),
          score: 0,
        };
    services.create(newComment)
         .then((response) => {
            fetchComments();
            setInputText("");
          })
          .catch((error) => {
            console.error("Error creating new comment", error);
          });
};
const handleInputChange = (event) => {
    setInputText(event.target.value);
};
const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
};
const handleCreateCommentClick = () => {
    setIsLoading(true);
    handleCreateCommentSubmit(newComment);
};

    return (
        <>
            <textarea
                value={newComment}
                onChange={handleInputChange}
                placeholder="Write a comment..."
            />
            <button type="submit" onClick={handleCreateCommentClick} disabled={isLoading}>
                {isLoading ? "Creating comment..." : "Create comment"}
            </button>
        </>
    )
}

export default CreateComment;