import * as React from "react";
import * as PropTypes from "prop-types";

import Message from "./Message";
import "./MessageList.css";

type MessageListProps = {};
type MessageListState = {};
class MessageList extends React.Component<MessageListProps, MessageListState> {
    // @ts-ignore
    componentDidUpdate = () => {
        // @ts-ignore
        this.node.scrollTop = this.node.scrollHeight;
    };
    render() {
        return (
            // @ts-ignore
            <div className="MessageList" ref={(node) => (this.node = node)}>
                //@ts-ignore
                {this.props.messages.map((message, i) => (
                    <Message key={i} {...message} />
                ))}
            </div>
        );
    }
}
export default MessageList;
