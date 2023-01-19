import React from "react";
import styles from "./InputMessage.module.css";

export class InputMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }
  handleSendMessage(event) {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if (this.messageInput.value.length > 0) {
      this.props.sendMessageLoading(
        this.ownerInput.value,
        this.ownerAvatarInput.value,
        this.messageInput.value
      );
      /* Reset input after send*/
      this.messageInput.value = "";
    }
  }
  handleTyping(event) {
    /* Tell users when another user has at least started to write */
    if (this.messageInput.value.length > 0) {
      this.props.typing(this.ownerInput.value);
    } else {
      /* When there is no more character, the user no longer writes */
      this.props.resetTyping(this.ownerInput.value);
    }
  }
  render() {
    /* If the chatbox state is loading, loading class for display */
    var loadingClass = this.props.isLoading
      ? "input-message-button--loading"
      : "";
    let sendButtonIcon = <i className={styles["material-icons"]}>send</i>;
    return (
      <form onSubmit={this.handleSendMessage}>
        <input
          type="hidden"
          ref={(owner) => (this.ownerInput = owner)}
          value={this.props.owner}
        />
        <input
          type="hidden"
          ref={(ownerAvatar) => (this.ownerAvatarInput = ownerAvatar)}
          value={this.props.ownerAvatar}
        />
        <input
          type="text"
          ref={(message) => (this.messageInput = message)}
          className={styles["input-message-input"]}
          placeholder="Text message"
          onKeyDown={this.handleTyping}
          onKeyUp={this.handleTyping}
          tabIndex="0"
        />
        <div
          className={styles["input-message-button"] + loadingClass}
          onClick={this.handleSendMessage}
        >
          {sendButtonIcon}
        </div>
      </form>
    );
  }
}
