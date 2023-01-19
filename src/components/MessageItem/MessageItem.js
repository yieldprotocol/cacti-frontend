import React from "react";
import styles from "./MessageItem.module.css";

export class MessageItem extends React.Component {
  render() {
    /* message position formatting - right if I'm the author */
    let messagePosition =
      this.props.owner == this.props.sender
        ? "message-item--right"
        : "message-item--left";
    return (
      <div className={styles["message-item"] + styles[messagePosition]}>
        <div className={styles[messagePosition]}>
          <img
            src={this.props.senderAvatar}
            alt={this.props.sender}
            className={styles["message-item-avatar"]}
          />
          <div
            className={styles["message-item-message-value"]}
            dangerouslySetInnerHTML={{ __html: this.props.message }}
          ></div>
        </div>
      </div>
    );
  }
}
