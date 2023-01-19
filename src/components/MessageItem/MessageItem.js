import React from "react";
import './MessageItem.css'
export class MessageItem extends React.Component {
  render() {
    /* message position formatting - right if I'm the author */
    let messagePosition = (( this.props.owner == this.props.sender ) ? 'message-item--right' : 'message-item--left');
    return (
      <div className={"message-item " + messagePosition + " clearfix"}>
        <img src={this.props.senderAvatar} alt={this.props.sender} className="message-item-avatar" />
        <div className="message-item-message-value" dangerouslySetInnerHTML={{__html: this.props.message}}></div>
      </div>
    );
  }
}
