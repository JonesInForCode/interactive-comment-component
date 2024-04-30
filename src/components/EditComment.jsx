import { useState } from "react"

const EditComment ({ id, fetchComments }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleEditSubmit = (updatedCommentData) => {
        services.updateComment(id, updatedCommentData)
            .then(() => {
                fetchComments();
                setIsEditing(false);
            })
            .catch((error) => console.error("Error updating comment:", error));
        };

    if (!isEditing) { 
        return (
            <form onSubmit={(event) => handleEditSubmit(event.target.elements)}>
                {/* Add input fields here */}
                <button type="submit">Save</button>
            </form>
        );
        } else {
            return (
                <button onClick={handleEditClick}>Edit</button>
            );
        }
}

export default EditComment;