import * as React from "react";
import * as PropTypes from "prop-types";
import "./MessageForm.css";

export interface props {
    onMessageSend: any;
}

export interface States {
}

class MessageForm extends React.Component<props, States> {
    static propTypes = {
        onMessageSend: PropTypes.func.isRequired,
    };
    // @ts-ignore
    componentDidMount = () => {
        // @ts-ignore
        this.input.focus();
    };

    handleFormSubmit = (event: any) => {
        event.preventDefault();
        // @ts-ignore
        this.props.onMessageSend(this.input.value);
        // @ts-ignore
        this.input.value = "";
    };

    render() {
        return (
            <form className="MessageForm" onSubmit={this.handleFormSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        // @ts-ignore
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
