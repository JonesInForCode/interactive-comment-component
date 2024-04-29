const Reply = ({ replyText, onSubmit, handleInputChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(replyText);
  };

    return (
<form onSubmit={handleSubmit}>
  <textarea
    value={replyText}
    onChange={handleInputChange}
    placeholder="Write a comment..."
  />
  <button type="submit">Submit</button>
</form>
    )
}

export default Reply