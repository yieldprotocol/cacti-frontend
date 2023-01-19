import React from "react";
import {MessageItem} from "../MessageItem/MessageItem";
import './MessageList.css'
export class MessageList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className={"message-list"}>
        {this.props.messages.slice(0).reverse().map(
          messageItem => (
            <MessageItem
              key={messageItem.id}
              owner={this.props.owner}
              sender={messageItem.sender}
              senderAvatar={messageItem.senderAvatar}
              message={messageItem.message}
            />
          )
        )}
      </div>
    );
  }
}
