import React from "react";
import {InputMessage} from "../InputMessage/InputMessage";
import {TypingIndicator} from "../TypingIndicator/TypingIndicator";
import {MessageList} from "../MessageList/MessageList";
import {Title} from "../Title/Title";
import './ChatBox.css'
export class ChatBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
    var timeout = null;
  }
  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  sendMessageLoading(sender, senderAvatar, message) {
    this.setState({ isLoading: true });
    this.props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 400);
  }
  render() {
    return (
      <div className={"chat-box"}>
        <Title
          owner={this.props.owner}
        />
        <MessageList
          owner={this.props.owner}
          messages={this.props.messages}
        />
        <div className={"chat-box-message clearfix"}>
          <TypingIndicator
            owner={this.props.owner}
            isTyping={this.props.isTyping}
          />
          <InputMessage
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            ownerAvatar={this.props.ownerAvatar}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
            typing={this.props.typing}
            resetTyping={this.props.resetTyping}
          />
        </div>
      </div>
    );
  }
}
