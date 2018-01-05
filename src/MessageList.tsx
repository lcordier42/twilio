import * as React from "react";
import * as PropTypes from "prop-types";

import Message from "./Message";
import "./MessageList.css";

type MessageListProps = {
    messages: [any];
};
type MessageListState = {};
class MessageList extends React.Component<MessageListProps, MessageListState> {
    node: any;
    componentDidUpdate() {
        this.node.scrollTop = this.node.scrollHeight;
    }
    render() {
        return (
            <div className="MessageList" ref={(node) => (this.node = node)}>
                {this.props.messages.map((message, i) => (
                    <Message key={i} {...message} />
                ))}
            </div>
        );
    }
}
export default MessageList;
