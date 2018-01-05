import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import "./Message.css";
type MessageProps = {
    author?: string;
    body: string;
    me?: boolean;
};
type MessageState = {};
class Message extends React.Component<MessageProps, MessageState> {
    render() {
        const classes = classNames("Message", {
            log: !this.props.author,
            me: this.props.me,
        });
        return React.createElement(
            "div",
            { className: classes },
            this.props.author &&
                React.createElement(
                    "span",
                    { className: "author" },
                    this.props.author,
                    ":",
                ),
            this.props.body,
        );
    }
}
export default Message;
