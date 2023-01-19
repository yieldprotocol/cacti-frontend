import React from "react";
import './Title.css'
export class Title extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className={"title"}>{this.props.owner}</div>
    );
  }
}
