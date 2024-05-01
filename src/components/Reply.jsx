import styles from "./Reply.module.css"

const Reply = ({ replyText, onSubmit, handleInputChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(replyText);
  };

    return (
<form className={styles.replyForm} onSubmit={handleSubmit}>
  <textarea
    value={replyText}
    onChange={handleInputChange}
    placeholder="Write a comment..."
  />
  <button className={styles.replyBtn} type="submit">Submit</button>
</form>
    )
}

export default Reply