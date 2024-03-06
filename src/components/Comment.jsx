import React from "react";
import styles from './Comment.module.css'

export default function Comment() {
   
    return (
        <div className={styles.commentCard}>
            <div className={styles.votes}>
                <button>+</button>
                <div>12</div>
                <button>-</button>
            </div>
            <div className={styles.commentInfo}>
                <span>Username</span>
                <button>reply</button>
            </div>
            <p className={styles.commentBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco labrois
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur.</p>
        </div>
    )
}