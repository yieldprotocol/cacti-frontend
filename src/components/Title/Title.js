import React from "react";
import styles from "./Title.module.css";
export class Title extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return <div className={styles["title"]}>{this.props.owner}</div>;
  }
}
