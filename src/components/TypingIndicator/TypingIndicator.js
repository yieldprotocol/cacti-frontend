import React from "react";
import styles from "./TypingIndicator.module.css";

export class TypingIndicator extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let typersDisplay = "";
    let countTypers = 0;
    /* for each user writing messages in chatroom */
    for (var key in this.props.isTyping) {
      /* retrieve the name if it isn't the owner of the chatbox */
      if (key != this.props.owner && this.props.isTyping[key]) {
        typersDisplay += ", " + key;
        countTypers++;
      }
    }
    /* formatting text */
    typersDisplay = typersDisplay.substr(1);
    typersDisplay += countTypers > 1 ? " are " : " is ";
    /* if at least one other person writes */
    if (countTypers > 0) {
      return (
        <div className={styles["typing-indicator"]}>
          {typersDisplay} writing
          <span className={styles["typing-indicator-dot"]}></span>
        </div>
      );
    }
    return <div className={styles["typing-indicator"]}></div>;
  }
}
