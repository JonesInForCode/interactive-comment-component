import React from 'react'

const Reply = ({ initialValue, onSubmit }) => {
    const [replyText, setReplyText] = React.useState(initialValue)

    const handleInputChange = (event) => {
        setReplyText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(replyText);
        setReplyText('')
    }
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