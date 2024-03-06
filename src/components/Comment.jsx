import React from "react";
import styles from './Comment.module.css'

export default function Comment() {
   const [voteCount, setVoteCount] = React.useState(0)

   const handleUpvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount + 1);
   }

   const handleDownvote = () => {
    setVoteCount((prevVoteCount) => prevVoteCount - 1);
   }

    return (
        <div className={styles.commentCard}>
            <div className={styles.votes}>
                <button onClick={handleUpvote}>+</button>
                <div>{voteCount}</div>
                <button onClick={handleDownvote}>-</button>
            </div>
            <div className={styles.commentInfo}>
                <div className={styles.commentInfoTitle}>
                    <img src="../../images/avatars/image-amyrobson.png" className={styles.avatar} />
                    <p>Username <span>date</span></p>
                    <button>reply</button>
                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco labrois
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur.</p>
            </div>
        </div>
    )
}