import * as React from "react";
import * as PropTypes from "prop-types";

import "./MessageForm.css";

type MessageFormProps = {
    onMessageSend: (...args: any[]) => any;
};

type MessageFormState = {};

class MessageForm extends React.Component<MessageFormProps, MessageFormState> {
    input: any;
    componentDidMount() {
        this.input.focus();
    }
    handleFormSubmit = (event: any) => {
        event.preventDefault();
        this.props.onMessageSend(this.input.value);
        this.input.value = "";
    };
    render() {
        return (
            <form className="MessageForm" onSubmit={this.handleFormSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        ref={(node) => (this.input = node)}
                        placeholder="Enter your message..."
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Send</button>
                </div>
            </form>
        );
    }
}
export default MessageForm;
